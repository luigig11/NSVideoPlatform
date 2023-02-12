import { Request, Response } from 'express';
import { Error, Sucess } from '../network/response';

import {signIn} from '../handlers/auth.handler';

async function httpSignin(req: Request, res: Response) {
    try {
        const token = await signIn(req.body.email, req.body.pass);
        res.cookie('t', token);
        return Sucess(req, res, 'Succesfully logged in', 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

function httpSignout(req: Request, res: Response) {
    try {
        res.clearCookie('t');
        return Sucess(req, res, 'Signed out', 200);
    } catch (error) {
        return Error(req, res, error);
    }
}

function requireSingin() {
    
}

function hasAuthorization() {
    
}

export {
    httpSignin,
    httpSignout,
    requireSingin,
    hasAuthorization
}