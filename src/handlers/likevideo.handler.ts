import { sequelizeConnection } from "../db/config";
import DBLikeVideo from "../db/repository/LikeVideo";
import { LikeVideo, QueryParametrs } from "../models/likevideo";

//#region Select methods
async function getAllLikeVideo(query: QueryParametrs): Promise<DBLikeVideo[]> {
    const orderItem = query.orderParameter || 'video_id';
    const orderList = query.listOrder || 'DESC';
    try {
        let likeVideo: DBLikeVideo[] = await DBLikeVideo.findAll({
            where: {
                creator_id: query.creator_id,
                is_liked: query.is_liked
            },
            order: [
                [orderItem, orderList]
            ]
        });
        if (!likeVideo) return likeVideo;
        return likeVideo;
    } catch (error) {
        console.log('Error while looking for video: ', error);
        throw new Error('Could not find liked video');
    }
}

async function getLike(query : QueryParametrs): Promise<LikeVideo | null> {
    try {
        let like: DBLikeVideo | null = await  DBLikeVideo.findOne({
            where: {
                creator_id: query.creator_id,
                video_id: query.video_id
            }
        });
        if(!like) return like
        return like.toJSON<LikeVideo>()
    } catch (error) {
        console.log('Error whiile looking for like: ', error);
        throw new Error('Could not Update like');        
    }
}


//#endregion

//#region Insert methods
async function addLikeVideo(query: QueryParametrs): Promise<LikeVideo | number[]> {
    const {video_id, creator_id} = query;
    const like: LikeVideo | null = await getLike({video_id, creator_id});
    if (like) {
        like.is_liked = query.is_liked;
        return await updateLikeVideo(like);
    }
    const t = await sequelizeConnection.transaction();
    try {
        const newLike: DBLikeVideo = await DBLikeVideo.create({
            creator_id: query.creator_id,
            video_id: query.video_id
        }, {transaction: t});
        await t.commit();
        //TODO: INVOKE INCREASELIKES();
        return newLike.toJSON<LikeVideo>();
    } catch (error) {
        if(t) await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The like was not created');
    }
}

//#region Update methods
async function updateLikeVideo(query: LikeVideo): Promise<number[]> {
    const t = await sequelizeConnection.transaction();
    try {
        const like: Array<number> = await DBLikeVideo.update({
            is_liked: query.is_liked
        }, {
            where: {
                like_video_id: query.like_video_id
            }
        }) ;
        //TODO: INVOKE INCREASELIKES();
        await t.commit();
        return like;
    } catch (error) {
        await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The like was not updated');
    }
}
//#endregion

export {
    getAllLikeVideo,
    addLikeVideo
}