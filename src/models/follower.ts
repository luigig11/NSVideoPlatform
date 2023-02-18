export interface Follower {
    follower_id: number;
    is_following: boolean;
    creator_id: number;
    creator_followed: number;
}

export interface QueryParameters {
    follower_id?: number;
    is_following?: boolean;
    creator_id?: number;
    creator_followed?: number;
    page?: string;
    limit?: string;
    orderParameter?: string;
    listOrder?: string;
}