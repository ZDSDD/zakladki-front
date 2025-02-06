import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, LoginCredentials, RegisterPayload } from "@/types/auth";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    register: (registerForm: RegisterPayload) => Promise<boolean>;
    fetchProtected: () => Promise<any>;
    refreshToken: () => Promise<boolean>;
    setCredentials: (user: User, token: string) => void;
    logOut: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            setCredentials: (user, token) =>
                set(() => ({
                    user,
                    token,
                    isAuthenticated: true,
                })),

            logOut: () => {
                set(() => ({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                }));
                window.location.reload();
            },

            login: async (credentials) => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_API_URL}/users/login`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(credentials),
                            credentials: "include",
                        }
                    );

                    if (!response.ok) {
                        const errorMessage = JSON.parse(await response.text()) as { error: string };
                        throw new Error(errorMessage.error);
                    }

                    const data = await response.json();
                    get().setCredentials(data.user, data.token);
                    return true;
                } catch (error) {
                    throw error
                }
            },

            register: async (registerForm) => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_API_URL}/users/register`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(registerForm),
                            credentials: "include",
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Registration failed");
                    }

                    const data = await response.json();
                    get().setCredentials(data.user, data.token);
                    return true;
                } catch (error) {
                    console.error("Register error:", error);
                    return false;
                }
            },

            fetchProtected: async () => {
                try {
                    const token = get().token;
                    const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_API_URL}/users/protected`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            credentials: "include",
                        }
                    );

                    if (response.status === 401) {
                        const refreshSuccess = await get().refreshToken();
                        if (refreshSuccess) {
                            return get().fetchProtected(); // Retry request
                        } else {
                            get().logOut();
                            return null;
                        }
                    }

                    if (!response.ok) throw new Error("Failed to fetch protected data");

                    return await response.json();
                } catch (error: any) {
                    console.error("Protected fetch error:", error);
                    return { error: error.message };
                }
            },

            refreshToken: async () => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_API_URL}/users/refresh`,
                        {
                            method: "POST",
                            credentials: "include",
                        }
                    );

                    if (!response.ok) return false;

                    const data = await response.json();
                    get().setCredentials(get().user!, data.token);
                    return true;
                } catch (error) {
                    console.error("Token refresh error:", error);
                    return false;
                }
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
