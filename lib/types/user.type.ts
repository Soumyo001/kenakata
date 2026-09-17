export type UserRoleType = "customer" | "admin";

export type UserType = {
    id:     number;
    email:  string;
    name:   string;
    role:   UserRoleType;
    avatar: string;
};

export type PlatziUserType = UserType & {
    password:    string;
    creationAt?: string;
    updatedAt?:  string;
};

export type CreateUserPayloadType = {
    name:     string;
    email:    string;
    password: string;
    avatar:   string;
};