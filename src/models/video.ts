
export interface Video {
    id?: number;
    title: string;
    description?: string;
    url: string;
    published?: boolean;
    views?: number;
    likes?: number;
    date_created?: string;
    date_published?: string;
    creator_id: number;
}

export interface QueryParametrs {
    video_id?: number;
    creator_id?: number;
    title?: string;
    published?: boolean;
    page?: string;
    limit?: string;
    orderParameter?: string;
    listOrder?: string;
}