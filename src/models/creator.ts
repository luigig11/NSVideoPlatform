export interface Creator {
    id: number;
    name: string;
    lastname: string;
    email: string;
    pass: string;
    photo: string;
    followers?: number;
}