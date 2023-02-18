import { Request, Response } from 'express';
import { addLikeVideo } from '../handlers/likevideo.handler';
import { Error, Sucess } from '../network/response';

//#region Get methods
//#endregion

//#region Post methods

async function httpAddLike(req: Request, res: Response): Promise<void> {
    try {
        const like = await addLikeVideo(req.body);
        return Sucess(req, res, 'Added like', 200);
    } catch (error) {
        return Error(req, res, 'Could not add like');
    }

}

async function httpRemoveLike(req: Request, res: Response): Promise<void> {
    try {
        const like = await addLikeVideo(req.body);
        return Sucess(req, res, 'removed like', 200);
    } catch (error) {
        return Error(req, res, 'Could not remove like');
    }

}

//#endregion

export {
    httpAddLike,
    httpRemoveLike
}