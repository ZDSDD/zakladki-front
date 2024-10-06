export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
}

export interface LoginPayload {
    user: User;
    token: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}
