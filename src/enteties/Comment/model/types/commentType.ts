import { User } from 'enteties/User';

export interface CommentType {
    id: string;
    user: User;
    text: string;
}
