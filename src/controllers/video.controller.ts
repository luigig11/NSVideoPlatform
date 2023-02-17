import { Request, Response } from "express";
import { create, publishVideo, getPublishedVideos, getLikedVideos, getVideo, update } from "../handlers/video.handler";
import { Video } from "../models/video";
import { Error, Sucess } from "../network/response";

async function httpCreateVideo(req: Request, res: Response) {
    try {
        const newVideo: Video = await create(req.body);
        return Sucess(req, res, newVideo, 200)
    } catch (error) {
        return Error(req, res, error);
    }
}

async function httpGetVideo(req: Request, res: Response) {
    try {
        const newVideo = await getVideo(req.query);
        return Sucess(req, res, newVideo, 200)
    } catch (error) {
        return Error(req, res, error);
    }
}

async function httpPublishVideo(req: Request, res: Response) {
    try {
        const {video_id, published} = req.body;
        const updatedVideo = await publishVideo({video_id, published});
        return Sucess(req, res, `${updatedVideo.length} videos published`, 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

async function httpUnPublishVideo(req: Request, res: Response) {
    try {
        const {video_id, published} = req.body;
        const updatedVideo = await publishVideo({video_id, published});
        return Sucess(req, res, `${updatedVideo.length} videos unpublished` , 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

async function httpEditVideo(req: Request, res: Response) {
    try {
        const editedVideo = await update(req.body);
        return Sucess(req, res, editedVideo , 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

async function httpGetVideos(req: Request, res: Response) {
    try {
        const publishedVideos = await getPublishedVideos(req.query);
        return Sucess(req, res, publishedVideos , 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

async function httpGetLikedVideos(req: Request, res: Response) {
    try {
        const likedVideos = await getLikedVideos(req.query);
        return Sucess(req, res, likedVideos , 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

export {
    httpCreateVideo,
    httpGetVideo,
    httpPublishVideo,
    httpUnPublishVideo,
    httpEditVideo,
    httpGetVideos,
    httpGetLikedVideos
}