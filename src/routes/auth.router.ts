import { Router } from "express";

import { httpSignin, httpSignout } from '../controllers/auth.controller';
import { validateRequiredData } from "../handlers/auth.handler";

const authRouter: Router = Router();

authRouter.get('/signout', httpSignout);
authRouter.post('/signin', validateRequiredData, httpSignin);

export {
    authRouter
}