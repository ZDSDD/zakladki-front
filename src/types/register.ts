import { User } from "./auth";

export interface RegisterResponse {
    user: User
}
export interface RegisterPayload {
    name: string
    email: string;
    password: string;
}