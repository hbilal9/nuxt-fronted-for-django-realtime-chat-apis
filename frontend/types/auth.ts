export type ICredentials = {
    email: string;
    password: string;
};

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    avatar: string;
    phone: string;
    email: string;
    role: string;
    is_active: boolean;
    last_login: string;
    date_joined: string;
}
