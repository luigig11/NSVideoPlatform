import { Request, Response } from "express";
import { create, publishVideo, getPublishedVideos, getLikedVideos, getVideo, update } from "../handlers/video.handler";
import { Video } from "../models/video";
import { Error, Sucess } from "../network/response";

//#region Get methods
async function httpGetVideo(req: Request, res: Response): Promise<void> {
    try {
        const newVideo: Video | null = await getVideo(req.query);
        if (!newVideo) return Error(req, res, 'could not find video')
        return Sucess(req, res, newVideo, 200)
    } catch (error) {
        return Error(req, res, error);
    }
}
async function httpGetVideos(req: Request, res: Response): Promise<void> {
    try {
        const publishedVideos: Video[] = await getPublishedVideos(req.query);
        return Sucess(req, res, publishedVideos , 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

async function httpGetLikedVideos(req: Request, res: Response): Promise<void> {
    try {
        const likedVideos: Video[] = await getLikedVideos(req.query);
        return Sucess(req, res, likedVideos , 200);
    } catch (error) {
        return Error(req, res, error);
    }
}
//#endregion

//#region Post methods

async function httpCreateVideo(req: Request, res: Response): Promise<void> {
    try {
        const newVideo: Video = await create(req.body as Video);
        return Sucess(req, res, newVideo, 200)
    } catch (error) {
        return Error(req, res, error);
    }
}
//#endregion

//#region Put methods
async function httpPublishVideo(req: Request, res: Response): Promise<void> {
    try {
        const {video_id, published} = req.body;
        const updatedVideo: number[] = await publishVideo({video_id, published});
        return Sucess(req, res, `${updatedVideo.length} videos published`, 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

async function httpUnPublishVideo(req: Request, res: Response): Promise<void> {
    try {
        const {video_id, published} = req.body;
        const updatedVideo: number[] = await publishVideo({video_id, published});
        return Sucess(req, res, `${updatedVideo.length} videos unpublished` , 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

async function httpEditVideo(req: Request, res: Response): Promise<void> {
    try {
        const editedVideo: number[] = await update(req.body);
        return Sucess(req, res, `${editedVideo.length} videos unpublished` , 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

//#endregion

export {
    httpCreateVideo,
    httpGetVideo,
    httpPublishVideo,
    httpUnPublishVideo,
    httpEditVideo,
    httpGetVideos,
    httpGetLikedVideos
}