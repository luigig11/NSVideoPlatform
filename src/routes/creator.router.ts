import { Router } from "express";

import { 
    httpSignup,
    httpGetProfile,
    editProfile,
    followCreator,
    unFollowCreator,
    addLike,
    removeLike
} from '../controllers/creator.controller';

import { validateRequiredData } from "../handlers/creator.handler";

const creatorRouter: Router = Router();

creatorRouter.post('/signup', validateRequiredData, httpSignup);
creatorRouter.get('/profile/:id', httpGetProfile);
creatorRouter.put('/editProfile', editProfile);
creatorRouter.put('/follow', followCreator);
creatorRouter.put('/unfollow', unFollowCreator);
creatorRouter.put('/likevideo', addLike);
creatorRouter.put('/unlikevideo', removeLike);


export {
    creatorRouter
}