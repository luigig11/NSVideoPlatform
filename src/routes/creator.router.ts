import { Router } from "express";

import { 
    httpSignup,
    httpGetProfile,
    httpEditProfile,
} from '../controllers/creator.controller';

import { getCreator, validateRequiredData } from "../handlers/creator.handler";

const creatorRouter: Router = Router();

creatorRouter.get('/profile/:id', httpGetProfile);
creatorRouter.post('/signup', validateRequiredData, httpSignup);
creatorRouter.put('/editProfile', httpEditProfile);

export {
    creatorRouter
}