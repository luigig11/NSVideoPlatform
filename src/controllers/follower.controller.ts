import { Request, Response } from 'express';
import { addFollower, getFollower, updateFollower } from '../handlers/follower.handler';
import { Error, Sucess } from '../network/response';

//#region Get methods
async function httpGetFollower(req:Request, res: Response): Promise<void> {
    try {
        const follower = await getFollower(req.query);
        if (!follower) return Error(req, res, 'could not find follower');
        return Sucess(req, res, follower, 200);
    } catch (error) {
        console.log('Error while getting follower: ', error);
        return Error(req, res, 'could not find follower');
    }
}
//#endregion

//#region Post methods

async function httpAddFollower(req: Request, res: Response): Promise<void> {
    try {
        if (req.body.follower_id) {
            await updateFollower(req.body);
        }
        else {
            await addFollower(req.body);
        }
        return Sucess(req, res, 'one follower Added', 200);
    } catch (error) {
        return Error(req, res, 'Could not add follower');
    }

}

async function httpUnFollow(req: Request, res: Response): Promise<void> {
    try {
        await updateFollower(req.body);
        return Sucess(req, res, 'one follower removed', 200);
    } catch (error) {
        return Error(req, res, 'Could not remove follower');
    }

}

//#endregion

export {
    httpAddFollower,
    httpUnFollow,
    httpGetFollower
}