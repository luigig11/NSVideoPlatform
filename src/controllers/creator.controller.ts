import { Request, Response } from 'express';

// import crypto from 'crypto'

import DBCreator from '../db/repository/Creator';

import { Creator } from '../models/creator';
import { sequelizeConnection } from '../db/config';
import { Error, Sucess } from '../network/response';

//httpSignup helpers
/* function makeSalt(): string {
    return Math.round((new Date().valueOf() * Math.random())) + '';
}

function encryptPassword(password: string): string {
    if (!password) return '';
    let salt = makeSalt();
    return crypto
        .createHash('sha1', )
        .update(password)
        .digest('hex')
} */
//httpSignup helpers

async function httpSignup(req: Request, res: Response) {

    if (!req.body.email) {
        return Error(req, res, 'required email');
    }
    //validar que el usuario no exista. consultar en BD usando el email obtenido
    let registeredCreator = await DBCreator.findOne({
        where: {
            email: req.body.email
        }
    });
    if (registeredCreator) {
        return Error(req, res, 'already existing creator');
    }
    //validar que venga toda la informacion requerida. TODO

    //Iniciar la transaccion
    const t = await sequelizeConnection.transaction();
    try {
        //crear la variable del creador
        const creator: Creator = {
            id: req.body.id,
            email: req.body.email,
            lastname: req.body.lastname,
            name: req.body.name,
            pass: req.body.pass,
            photo: req.body.photo
        }
        //encriptar la contraseña. TODO :(

        //guardar el nuevo usuario en la base de datos
        await DBCreator.create({
            id: creator.id,
            creator_name: creator.name,
            creator_lastname: creator.lastname,
            emai: creator.email,
            pass: creator.pass,
            photo: creator.photo
        }, {transaction: t});

        await t.commit();

        return Sucess(req, res, creator, 200);
    } catch (error) {
        await t.rollback();
    }


}

function creatorById() {

}

function editProfile() {

}

function followCreator() {

}

function unFollowCreator() {

}

function addLike() {

}

function removeLike() {

}

export {
    httpSignup,
    creatorById,
    editProfile,
    followCreator,
    unFollowCreator,
    addLike,
    removeLike
}