import { Video } from "./video";

export interface Creator {
    id?: number;
    name: string;
    lastname: string;
    email: string;
    pass: string;
    photo: string;
    followers?: number;
    rol_id: number
}

export interface QueryParametrs {
    id?: number;
    email?: string;
    page?: string;
    limit?: string;
}

export interface Profile {
    generalInfo: Creator;
    creator_videos: Video[] | null;
    liked_videos: Video[] | null;
}