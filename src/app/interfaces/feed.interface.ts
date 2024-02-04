import { User } from "./user.interface";


export interface Feed {
    title: string;
    content: string;
    user: User;
    id: string;
    like: number;
}