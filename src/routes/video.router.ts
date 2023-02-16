import { Router } from "express";


import { 
    httpCreateVideo,
    getVideoById,
    httpUnPublishVideo,
    httpPublishVideo,
    editVideo,
    getVideos
} from '../controllers/video.controller';
import { validateRequiredData } from "../handlers/video.handler";

const videoRouter: Router = Router();

videoRouter.post('/create', validateRequiredData,  httpCreateVideo);
videoRouter.get('/video', getVideoById);
videoRouter.put('/publish', httpPublishVideo);
videoRouter.put('/unpublish', httpUnPublishVideo);
videoRouter.put('/edit', editVideo);
videoRouter.get('/listvideo', getVideos);


export {
    videoRouter
}