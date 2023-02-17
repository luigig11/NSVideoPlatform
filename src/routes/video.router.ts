import { Router } from "express";


import { 
    httpCreateVideo,
    httpUnPublishVideo,
    httpPublishVideo,
    httpEditVideo,
    httpGetVideos,
    httpGetLikedVideos,
    httpGetVideo
} from '../controllers/video.controller';

import { validateRequiredData } from "../handlers/video.handler";

const videoRouter: Router = Router();

videoRouter.get('/', httpGetVideo);
videoRouter.get('/listvideos', httpGetVideos);
videoRouter.get('/likevideos', httpGetLikedVideos);
videoRouter.post('/create', validateRequiredData,  httpCreateVideo);
videoRouter.put('/publish', httpPublishVideo);
videoRouter.put('/unpublish', httpUnPublishVideo);
videoRouter.put('/edit', httpEditVideo);

export {
    videoRouter
}