import { Router } from "express";

import { 
    httpSignup,
    httpGetProfile,
    httpEditProfile,
    followCreator,
    unFollowCreator,
} from '../controllers/creator.controller';

import { getCreator, validateRequiredData } from "../handlers/creator.handler";

const creatorRouter: Router = Router();

creatorRouter.get('/profile/:id', httpGetProfile);
creatorRouter.post('/signup', validateRequiredData, httpSignup);
creatorRouter.put('/editProfile', httpEditProfile);
creatorRouter.put('/follow', followCreator);
creatorRouter.put('/unfollow', unFollowCreator);

export {
    creatorRouter
}