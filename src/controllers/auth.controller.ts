import { Request, Response } from 'express';
import { Error, Sucess } from '../network/response';

import {signIn} from '../handlers/auth.handler';

//#region Get methods
function httpSignout(req: Request, res: Response) {
    try {
        res.clearCookie('t');
        return Sucess(req, res, 'Signed out', 200);
    } catch (error) {
        return Error(req, res, error);
    }
}
//#endregion

//#region Post methods
async function httpSignin(req: Request, res: Response): Promise<void> {
    try {
        const token: string = await signIn(req.body.email, req.body.pass);
        res.cookie('t', token);
        return Sucess(req, res, 'Succesfully logged in', 200);
    } catch (error) {
        return Error(req, res, error);
    }
}
//#endregion



export {
    httpSignin,
    httpSignout
}