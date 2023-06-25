import { UserRole } from 'enteties/User/model/const/const';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
}

export interface UserSchema {
    authData?: User;
    _mounted?: boolean;
}
