import {Request, Response} from 'express';

export const Sucess = (req: Request, res: Response, message: any = '', status: any) => {
    res.status(status).send({
        error: false,
        status,
        body: message
    });
}

export const Error = (req: Request, res: Response, details: any, message: any='Internal Server Error', status: any = 500) => {
    res.status(status).send({
        error: true,
        status,
        body: message
    })
}