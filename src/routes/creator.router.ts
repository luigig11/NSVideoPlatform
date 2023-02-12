import { Router } from "express";

import { 
    httpSignup,
    creatorById,
    editProfile,
    followCreator,
    unFollowCreator,
    addLike,
    removeLike
} from '../controllers/creator.controller';

const creatorRouter: Router = Router();

creatorRouter.post('/signup', httpSignup);
creatorRouter.get('/profile', creatorById);
creatorRouter.put('/editProfile', editProfile);
creatorRouter.put('/follow', followCreator);
creatorRouter.put('/unfollow', unFollowCreator);
creatorRouter.put('/likevideo', addLike);
creatorRouter.put('/unlikevideo', removeLike);


export {
    creatorRouter
}