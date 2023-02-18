import { Video } from "./video";

export interface Creator {
    creator_id?: number;
    creator_name: string;
    creator_lastname: string;
    email: string;
    pass: string;
    photo?: string;
    followers?: number;
    rol_id: number
}

export interface QueryParametrs {
    id?: number;
    email?: string;
    page?: string;
    limit?: string;
    orderParameter?: string;
    listOrder?: string;
}

export interface Profile {
    generalInfo: Creator;
    creator_videos: Video[];
    liked_videos: Video[];
}