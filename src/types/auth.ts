export interface User {
    id: string;
    name: string;
    email?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}
