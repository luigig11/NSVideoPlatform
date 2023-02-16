import DbCreator from '../db/repository/Creator';
import { sequelizeConnection } from "../db/config";
import DBLikeVideo from '../db/repository/LikeVideo';
import DBVideo from '../db/repository/Video';
import { QueryParametrs, Video } from "../models/video";
import { NextFunction, Request, Response } from 'express';
import { Error as NetworkError } from '../network/response';


function validateRequiredData(req: Request, res: Response, next: NextFunction) {
    const {
        title,
        url,
        creator_id,
    } = req.body;

    if (!title) return NetworkError(req, res, 'required name');
    if (!url) return NetworkError(req, res, 'required lastname');
    if (!creator_id) return NetworkError(req, res, 'required email');
    next();
}

async function create(video: Video) {

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
        return newVideo.toJSON();

    } catch (error) {
        await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The video was not created');
    }
}

async function getVideo(query: QueryParametrs) {
    //select limit = parameter * from videos where creator_id = <parameter> and creator
    try {

        const queryParameter = query.creator_id ? 'creator_id' : 'video_id';
        const value = (queryParameter === 'creator_id') ? query.creator_id : query.video_id;

        let video = await DBVideo.findOne({
            where: {
                [queryParameter]: value
            }
        });
        if (!video) {
            return null;
        }
        return video.toJSON<Video>();
    } catch (error) {
        console.log('Error while looking for vido: ', error);
        throw new Error('Could not find video');
    }
}

async function getAllVideos(query: QueryParametrs) {
    //select limit = parameter * from videos where creator_id = <parameter> and creator
    const queryParameter = query.creator_id ? 'creator_id' : 'video_id';
    const value = (queryParameter === 'creator_id') ? query.creator_id : query.video_id;
    const orderItem = query.orderParameter || 'video_id';
    const orderList = query.listOrder || 'DESC';

    try {
        let videos = await DBVideo.findAll({
            where: {
                [queryParameter]: value
            },
            limit: parseInt(query.limit!),
            offset: parseInt(query.page!),
            order: [
                [orderItem, orderList]
            ]
        });
        if (!videos) {
            return null;
        }
        let listVideo: Video[] = videos.map(video => video.toJSON<Video>());
        return listVideo;
    } catch (error) {
        console.log('Error while getting videos: ', error);
        throw new Error('Could not find videos');
    }
}

async function getPublishedVideos(query: QueryParametrs) {
    const queryParameter = query.creator_id ? 'creator_id' : 'video_id';
    const value = (queryParameter === 'creator_id') ? query.creator_id : query.video_id;
    const orderItem = query.orderParameter || 'video_id';
    const orderList = query.listOrder || 'DESC';
    try {
        let videos = await DBVideo.findAll({
            where: {
                [queryParameter]: value,
                published: query.published
            },
            limit: parseInt(query.limit!),
            offset: parseInt(query.page!),
            order: [
                orderItem, orderList
            ]
        });
        if (!videos) {
            return null;
        }
        let listVideo: Video[] = videos.map(video => video.toJSON());
        return listVideo;
    } catch (error) {
        console.log('Error while getting videos: ', error);
        throw new Error('Could not find videos');
    }
}

async function getLikedVideos(query: QueryParametrs) {
    const orderItem = query.orderParameter || 'video_id';
    const orderList = query.listOrder || 'DESC';
    try {

        let creator_video = await DBLikeVideo.findAll({
            where: {
                creator_id: query.creator_id
            },
            limit: parseInt(query.limit!),
            offset: parseInt(query.page!),
            order: [
                [orderItem, orderList]
            ]
        });

        if (!creator_video) return null;

        let videoId = creator_video.map(video => {
            return video.getDataValue('video_id');
        });

        let likedvideos = await DBVideo.findAll({
            where: {
                video_id: [...videoId]
            },
            limit: parseInt(query.limit!),
            offset: parseInt(query.page!),
            order: [
                [orderItem, orderList]
            ]
        });

        if (!likedvideos) return null;

        let listVideo: Video[] = likedvideos.map(video => video.toJSON());
        return listVideo;
    } catch (error) {
        console.log('Error while getting videos: ', error);
        throw new Error('Could not find videos');
    }
}

export {
    getVideo,
    getAllVideos,
    getPublishedVideos,
    getLikedVideos,
    create,
    validateRequiredData
}