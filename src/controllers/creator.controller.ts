import { query, Request, Response } from 'express';
import { Error, Sucess } from '../network/response';
import { create, getCreator, update } from '../handlers/creator.handler';
import { createtoken } from '../handlers/auth.handler';
import { Creator, QueryParametrs as CreatorQueryParameters, Profile } from '../models/creator';
import { Video, QueryParametrs as VideoQueryParameters } from '../models/video';
import { getAllVideos, getLikedVideos } from '../handlers/video.handler';

//#region Get methods
async function httpGetProfile(req: Request, res: Response): Promise<void> {

    try {
        //get the creator information
        const creator: Creator | null = await getCreator({ id: parseInt(req.params.id) } as CreatorQueryParameters);
        if (!creator) return Error(req, res, 'Creator not found');
        //get the videos created by the creator
        const videos: Video[] = await getAllVideos(
            {
                creator_id: parseInt(req.params.id),
                limit: req.query.limit?.toString(), //TODO: create default values for this parameter
                page: req.query.page?.toString() //TODO: create default values for this parameter
            } as VideoQueryParameters
        );
        //get the liked videos
        const likedVideos: Video[] = await getLikedVideos(
            {
                creator_id: parseInt(req.params.id),
                limit: req.query.limit?.toString(), //TODO: create default values for this parameter
                page: req.query.page?.toString(),//TODO: create default values for this parameter
                is_liked: req.query.is_liked
            } as VideoQueryParameters
        );

        //GET THE FOLLOWES. TODO

        //create the creator profile
        const profile: Profile = {
            generalInfo: creator,
            creator_videos: videos,
            liked_videos: likedVideos
        }
        return Sucess(req, res, profile, 200);
    } catch (error) {
        return Error(req, res, error);
    }

}

//#endregion 

//#region Post methods

async function httpSignup(req: Request, res: Response): Promise<void> {
    try {
        const newCreator: Creator = await create(req.body as Creator);
        const token = createtoken({
            id: newCreator.creator_id!,
            name: newCreator.creator_name,
            lastname: newCreator.creator_lastname
        });
        res.cookie('t', token);
        return Sucess(req, res, 'New user created', 200)
    } catch (error) {
        return Error(req, res, error);
    }
}
//#endregion

//#region Put methods
async function httpEditProfile(req: Request, res: Response): Promise<void> {
    try {
        const editedCreator: number[] = await update(req.body);
        return Sucess(req, res, `${editedCreator.length} creators updated`, 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

//#endregion

//#region Delete methods
//#endregion



export {
    httpSignup,
    httpGetProfile,
    httpEditProfile,
}