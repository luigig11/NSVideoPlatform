
export interface LikeVideo {
    like_video_id?: number;
    is_liked?: boolean;
    creator_id: number;
    video_id: number;
}

export interface QueryParametrs {
    like_video_id?: number;
    is_liked?: boolean;
    creator_id?: number;
    video_id?: number;
    page?: string;
    limit?: string;
    orderParameter?: string;
    listOrder?: string;
}
