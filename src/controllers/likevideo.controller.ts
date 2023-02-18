import { Request, Response } from 'express';
import { addLikeVideo, getLike, updateLikeVideo } from '../handlers/likevideo.handler';
import { Error, Sucess } from '../network/response';

//#region Get methods
async function httpGetLike(req:Request, res: Response): Promise<void> {
    try {
        const like = await getLike(req.query);
        if (!like) return Error(req, res, 'could not find like');
        return Sucess(req, res, like, 200);
    } catch (error) {
        console.log('Error while getting like: ', error);
        return Error(req, res, 'could not find like');
    }
}
//#endregion

//#region Post methods

async function httpAddLike(req: Request, res: Response): Promise<void> {
    try {
        if (req.body.like_video_id) {
            await updateLikeVideo(req.body);
        }
        else {
            await addLikeVideo(req.body);
        }
        return Sucess(req, res, 'one like Added', 200);
    } catch (error) {
        return Error(req, res, 'Could not add like');
    }

}

async function httpRemoveLike(req: Request, res: Response): Promise<void> {
    try {
        await updateLikeVideo(req.body);
        return Sucess(req, res, 'one like removed', 200);
    } catch (error) {
        return Error(req, res, 'Could not remove like');
    }

}

//#endregion

export {
    httpAddLike,
    httpRemoveLike,
    httpGetLike
}