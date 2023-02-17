import { Request, Response } from 'express';
/* import DBCreator from '../db/repository/Creator';

import { Creator } from '../models/creator';
import { sequelizeConnection } from '../db/config'; */
import { Error, Sucess } from '../network/response';
import { create, getCreator } from '../handlers/creator.handler';
import { createtoken } from '../handlers/auth.handler';
import { Creator, QueryParametrs as CreatorQueryParameters, Profile } from '../models/creator';
import { Video, QueryParametrs as VideoQueryParameters } from '../models/video';
import { getAllVideos, getLikedVideos } from '../handlers/video.handler';

async function httpSignup(req: Request, res: Response): Promise<void> {
    try {
        const newCreator = await create(req.body);
        const token = createtoken({
            id: newCreator.creator_id!,
            name: newCreator.creator_name,
            lastname: newCreator.creator_lastname
        });
        res.cookie('t', token);
        return Sucess(req, res, newCreator, 200)
    } catch (error) {
        return Error(req, res, error);
    }
}

async function httpGetProfile(req: Request, res: Response): Promise<void> {
    
    try {
        //get the creator information
        const creator: Creator = await getCreator({ id: parseInt(req.params.id) } as CreatorQueryParameters);
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
                page: req.query.page?.toString()//TODO: create default values for this parameter
            } as VideoQueryParameters
        );

        //GET THE FOLLOWES. TODO

        //create the creator profile
        const profile: Profile = {
            generalInfo: creator,
            creator_videos: videos,
            liked_videos: likedVideos
        }
        return Sucess(req, res, profile, 200)
    } catch (error) {
        return Error(req, res, error);
    }

}

function editProfile() {

}

function followCreator() {

}

function unFollowCreator() {

}

function addLike() {

}

function removeLike() {

}

export {
    httpSignup,
    httpGetProfile,
    editProfile,
    followCreator,
    unFollowCreator,
    addLike,
    removeLike
}