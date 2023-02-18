import { Router } from "express";
import { httpAddLike, httpRemoveLike } from "../controllers/likevideo.controller";

const likevideoRouter: Router = Router();

likevideoRouter.post('/', httpAddLike);
likevideoRouter.post('/unlikevideo', httpRemoveLike);

export {
    likevideoRouter
}