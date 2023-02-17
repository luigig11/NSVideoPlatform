import { NextFunction, Request, Response } from 'express';
import { decrypt } from "../helpers/crypto";
import { Creator } from "../models/creator";
import { getCreator } from "./creator.handler";
import { expressjwt } from "express-jwt";
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
        let creator: Creator | null = await getCreator({email});
        if (!creator) throw new Error('Creator does not exist');
        const authenticate = await decrypt(password, creator.pass);
        if ( !authenticate) throw new Error("Email and password don't match");

        //create token
        const Payload = {
            id: creator.creator_id!,
            name: creator.creator_name,
            lastname: creator.creator_lastname
        }
        const token = createtoken(Payload);
        return token;

    } catch (error) {
        console.log('singIn error: ', error);        
        throw new Error('could not sign in');
    }
}

//TODO: Authorization and authentication
const requireSignin = expressjwt({
    secret: process.env.JWT_SECRET!,
    requestProperty: 'auth',
    algorithms: ['RS256', 'HS256']
});

function hasAuthorization(req: any, res: Response, next: NextFunction) {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id; //Aquí se hace solo la comparacion por valor porque req.profile._id y req.auth._id no son del mismo tipo
    console.log(req.profile)
    console.log(req.auth)
    console.log(req.profile._id)
    console.log(req.auth._id)
    if (!(authorized)) {
        return NetworkError(req, res, 'User is not authorized', 'User is not authorized', '403')
    }
    next();
}

export {
    signIn,
    validateRequiredData,
    createtoken,
    requireSignin,
    hasAuthorization
}