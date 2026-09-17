export type UserRoleType = "customer" | "admin";

export type UserType = {
    id: number;
    name: string;
    email: string;
    role: UserRoleType;
    avatar: string;
    creationAt?: string;
    updatedAt?: string;
};

export type AuthTokensType = {
    access_token: string;
    refresh_token: string;
};