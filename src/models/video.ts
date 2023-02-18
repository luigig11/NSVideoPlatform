
export interface Video {
    video_id?: number;
    title: string;
    description?: string;
    url: string;
    published?: boolean;
    video_view?: number;
    video_like?: number;
    creation_date?: string;
    date_published?: string;
    creator_id: number;
    is_deleted: boolean;
}

export interface QueryParametrs {
    video_id?: number;
    creator_id?: number;
    title?: string;
    published?: boolean;
    is_liked?: boolean;
    video_like?: number;
    page?: string;
    limit?: string;
    orderParameter?: string;
    listOrder?: string;
    
}