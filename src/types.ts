import { User } from "firebase/auth";

export interface UserType extends User {}

export interface AuthContextType {
    user: null | UserType;
    loading: boolean;
}

export interface Admin {}

export interface AdminAuthContextType {
    admin: null | Admin;
    loading: boolean;
    failed: boolean;
    setAdmin: (admin: Admin) => void;
    onRetry: () => void;
}

export interface ProductCategory {
    id: number;
    name: string;
    parent?: number | null;
    children?: ProductCategory[];
}

/**
 * Status indication the state of the email verification sending email
 * Sent: The verification code was sent sucessfully
 * Error: An error occured while sending verification code
 * No-action: (default) No action
 */
export type EmailVerificationSendStatus = "sent" | "error" | "no-action";
