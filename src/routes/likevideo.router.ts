import { Router } from "express";
import { httpAddLike, httpRemoveLike, httpGetLike } from "../controllers/likevideo.controller";

const likevideoRouter: Router = Router();

likevideoRouter.get('/', httpGetLike);
likevideoRouter.post('/', httpAddLike);
likevideoRouter.post('/unlikevideo', httpRemoveLike);

export {
    likevideoRouter
}