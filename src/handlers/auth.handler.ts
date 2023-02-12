import { NextFunction, Request, Response } from 'express';
import { decrypt } from "../helpers/crypto";
import { Creator } from "../models/creator";
import { getCreator } from "./creator.handler"
import jwt, { Jwt } from 'jsonwebtoken';
import { Error as NetworkError } from '../network/response';

interface TokenPayloadObject {
    id: number,
    name: string,
    lastname: string
}

function createtoken(payload: TokenPayloadObject): string {
    const JWT_SECRET: string = process.env.JWT_SECRET!;
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'});
    return token;
}

function validateRequiredData(req: Request, res: Response, next: NextFunction) {
    const {
        email,
        pass,
    } = req.body;

    if (!email) return NetworkError(req, res, 'required email');
    if (!pass) return NetworkError(req, res, 'required pass');

    next();
}

async function signIn(email: string, password: string) {
    try {

        //autenticating user
        let creator: Creator = await getCreator(email);
        if (!creator) throw new Error('Creator does not exist');
        const authenticate = await decrypt(password, creator.pass);
        if ( !authenticate) throw new Error("Email and password don't match");

        //create token
        const Payload = {
            id: creator.id!,
            name: creator.name,
            lastname: creator.lastname
        }
        const token = createtoken(Payload);
        return token;

    } catch (error) {
        console.log('singIn error: ', error);        
        throw new Error('could not sign in');
    }
}

export {
    signIn,
    validateRequiredData
}