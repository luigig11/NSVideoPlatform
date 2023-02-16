import { Request, Response } from "express";
import { create } from "../handlers/video.handler";
import { Error, Sucess } from "../network/response";

async function httpCreateVideo(req: Request, res: Response) {
    try {
        const newVideo = await create(req.body);
        return Sucess(req, res, newVideo, 200)
    } catch (error) {
        return Error(req, res, error);
    }
}

function getVideoById() {
    
}

function publishVideo() {
    
}

function hideVideo() {
    
}

function editVideo() {
    
}

function getVideos() {
    
}

export {
    httpCreateVideo,
    getVideoById,
    publishVideo,
    hideVideo,
    editVideo,
    getVideos
}