import { Request, Response } from 'express';
/* import DBCreator from '../db/repository/Creator';

import { Creator } from '../models/creator';
import { sequelizeConnection } from '../db/config'; */
import { Error, Sucess } from '../network/response';
import { create } from '../handlers/creator.handler';

async function httpSignup(req: Request, res: Response) {
    try {
        const newCreator = await create(req.body);
        return Sucess(req, res, newCreator, 200)
    } catch (error) {
        return Error(req, res, error);
    }
}

function creatorById() {

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
    creatorById,
    editProfile,
    followCreator,
    unFollowCreator,
    addLike,
    removeLike
}