import DbCreator from '../db/repository/Creator';
import { sequelizeConnection } from "../db/config";
import DBLikeVideo from '../db/repository/LikeVideo';
import DBVideo from '../db/repository/Video';
import { QueryParametrs, Video } from "../models/video";
import { NextFunction, Request, Response } from 'express';
import { Error as NetworkError } from '../network/response';
import { getAllLikeVideo } from './likevideo.handler';
import { LikeVideo } from '../models/likevideo';


function validateRequiredData(req: Request, res: Response, next: NextFunction) {
    const {
        title,
        url,
        creator_id,
    } = req.body as Video;

    if (!title) return NetworkError(req, res, 'required name');
    if (!url) return NetworkError(req, res, 'required lastname');
    if (!creator_id) return NetworkError(req, res, 'required email');
    next();
}

//#region Select methods
async function getVideo(query: QueryParametrs): Promise<Video | null> {
    //select limit = parameter * from videos where creator_id = <parameter> and creator
    try {
        let video: DBVideo | null = await DBVideo.findOne({
            where: {
                video_id: query.video_id
            }
        });
        if (!video) return video;
        return video.toJSON<Video>();
    } catch (error) {
        console.log('Error while looking for vido: ', error);
        throw new Error('Could not find video');
    }
}
async function getAllVideos(query: QueryParametrs): Promise<Video[]> {
    //select limit = parameter * from videos where creator_id = <parameter> and creator
    const queryParameter = query.creator_id ? 'creator_id' : 'video_id';
    const value = (queryParameter === 'creator_id') ? query.creator_id : query.video_id;
    const orderItem = query.orderParameter || 'video_id';
    const orderList = query.listOrder || 'DESC';

    try {
        let videos: DBVideo[] = await DBVideo.findAll({
            where: {
                [queryParameter]: value
            },
            limit: parseInt(query.limit!),
            offset: parseInt(query.page!),
            order: [
                [orderItem, orderList]
            ]
        });
        if (!videos) return [];
        const listVideo: Video[] = videos.map(video => video.toJSON<Video>());
        return listVideo;
    } catch (error) {
        console.log('Error while getting videos: ', error);
        throw new Error('Could not find videos');
    }
}
async function getPublishedVideos(query: QueryParametrs): Promise<Video[]> {
    const orderItem = query.orderParameter || 'video_id';
    const orderList = query.listOrder || 'DESC';
    try {
        let videos = await DBVideo.findAll({
            where: {
                published: query.published
            },
            limit: parseInt(query.limit!),
            offset: parseInt(query.page!),
            order: [
                [orderItem, orderList]
            ]
        });
        if (!videos) {
            return [];
        }
        let listVideo: Video[] = videos.map(video => video.toJSON());
        return listVideo;
    } catch (error) {
        console.log('Error while getting videos: ', error);
        throw new Error('Could not find videos');
    }
}
async function getLikedVideos(query: QueryParametrs): Promise<Video[]> {
    const orderItem = query.orderParameter || 'video_id';
    const orderList = query.listOrder || 'DESC';
    console.log(query);
    try {
        //TODO: MEMOIZE THIS LIST
        let creator_video: DBLikeVideo[] = await getAllLikeVideo({
            creator_id: query.creator_id!,
            is_liked: query.is_liked,
            orderParameter: query.orderParameter,
            listOrder: query.listOrder
        });

        if (!creator_video) return [];

        let videoId: string[] = creator_video.map(video => {
            return video.getDataValue('video_id');
        });

        let likedvideos: DBVideo[] = await DBVideo.findAll({
            where: {
                video_id: videoId
            },
            limit: parseInt(query.limit!),
            offset: parseInt(query.page!),
            order: [
                [orderItem, orderList]
            ]
        });

        if (!likedvideos) return [];

        let listVideo: Video[] = likedvideos.map(video => video.toJSON<Video>());
        return listVideo;
    } catch (error) {
        console.log('Error while getting videos: ', error);
        throw new Error('Could not find videos');
    }
}
//#endregion

//#region Insert methods

async function create(video: Video): Promise<Video> {

    const date_created = new Date().toUTCString();
    console.log('date_created', date_created);

    //Begin transaction
    const t = await sequelizeConnection.transaction();
    try {
        const newVideo: DBVideo = await DBVideo.create({
            title: video.title,
            description: video.description,
            url: video.url,
            creation_date: date_created,
            creator_id: video.creator_id
        }, { transaction: t });

        console.log('usuario creado: ', newVideo.toJSON());
        await t.commit();
        return newVideo.toJSON<Video>();

    } catch (error) {
        await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The video was not created');
    }
}

//#endregion

//#region Update methods
async function publishVideo(query:QueryParametrs): Promise<Array<number>> {
    const video: Video | null = await getVideo(query);
    if (!video) throw new Error('video not founded');
    const t = await sequelizeConnection.transaction();
    try {        
        const updatedVideo: Array<number> = await DBVideo.update({
            published: query.published
        }, {
            where: {
                video_id: query.video_id
            }
        })
        await t.commit();
        return updatedVideo;
    } catch (error) {
        await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The video was not updated');
    }
}

async function update(query: Video): Promise<Array<number>> {
    const video: Video | null = await getVideo(query);
    if (!video) throw new Error('video not founded');
    const t = await sequelizeConnection.transaction();
    try {        
        const updatedVideo: number[] = await DBVideo.update({
            title: query.title,
            description: query.description,
            url: query.url,
        }, {
            where: {
                video_id: query.video_id
            }
        })
        await t.commit();
        return updatedVideo;
    } catch (error) {
        await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The video was not updated');
    }
}

//#endregion

export {
    getVideo,
    getAllVideos,
    getPublishedVideos,
    getLikedVideos,
    create,
    validateRequiredData,
    publishVideo,
    update
}