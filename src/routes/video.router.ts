import { Router } from "express";

import { 
    createVideo,
    getVideoById,
    publishVideo,
    hideVideo,
    editVideo,
    getVideos
} from '../controllers/video.controller';

const videoRouter: Router = Router();

videoRouter.post('/create', createVideo);
videoRouter.get('/video', getVideoById);
videoRouter.put('/publish', publishVideo);
videoRouter.put('/unpublish', hideVideo);
videoRouter.put('/edit', editVideo);
videoRouter.get('/listvideo', getVideos);


export {
    videoRouter
}