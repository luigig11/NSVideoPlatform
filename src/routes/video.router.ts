import { Router } from "express";


import { 
    httpCreateVideo,
    getVideoById,
    publishVideo,
    hideVideo,
    editVideo,
    getVideos
} from '../controllers/video.controller';
import { validateRequiredData } from "../handlers/video.handler";

const videoRouter: Router = Router();

videoRouter.post('/create', validateRequiredData,  httpCreateVideo);
videoRouter.get('/video', getVideoById);
videoRouter.put('/publish', publishVideo);
videoRouter.put('/unpublish', hideVideo);
videoRouter.put('/edit', editVideo);
videoRouter.get('/listvideo', getVideos);


export {
    videoRouter
}