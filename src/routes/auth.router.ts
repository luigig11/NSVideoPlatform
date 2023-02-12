import { Router } from "express";

import { signin } from '../controllers/auth.controller';
import { signout } from '../controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post('/signin', signin);
authRouter.get('/signout', signout);


export {
    authRouter
}