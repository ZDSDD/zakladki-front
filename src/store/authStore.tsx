import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types/auth'

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    setCredentials: (user: User, token: string) => void
    logOut: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            setCredentials: (user: User, token: string) =>
                set(() => ({
                    user,
                    token,
                    isAuthenticated: true,
                })),

            logOut: () =>
                set(() => ({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                })),
        }),
        {
            name: 'auth-storage', // Key for localStorage
            partialize: (state) => ({
                user: state.user, // Consider storing only necessary fields
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)
