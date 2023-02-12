import { Request, Response } from 'express';

// import crypto from 'crypto'

import DBCreator from '../db/repository/Creator';
import bcrypt from "bcrypt";

import { Creator } from '../models/creator';
import { sequelizeConnection } from '../db/config';
import { Error, Sucess } from '../network/response';




//httpSignup helpers

async function encryptPassword(password: string): Promise<string> {
    const SALT_ROUNDS = 10;
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPass;
}
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
    console.log('registeredCreator: ', registeredCreator);
    
    if (registeredCreator) {
        return Error(req, res, 'already existing creator');
    }
    //validar que venga toda la informacion requerida. TODO

    //Iniciar la transaccion
    const t = await sequelizeConnection.transaction();
    try {
         //encriptar la contraseña. 
         let hashedPass = await encryptPassword(req.body.pass);
         console.log('contraseña hasheada: ', hashedPass);
         
        //crear la variable del creador
        const creator: Creator = {
            email: req.body.email,
            lastname: req.body.lastname,
            name: req.body.name,
            pass: hashedPass,
            photo: req.body.photo,
            rol_id: req.body.rol_id
        }
        console.log('creator: ', creator);
        //guardar el nuevo usuario en la base de datos
        const newUser: DBCreator = await DBCreator.create({
            creator_name: creator.name,
            creator_lastname: creator.lastname,
            email: creator.email,
            pass: creator.pass,
            photo: creator.photo,
            rol_id: creator.rol_id
        }, {transaction: t});
        console.log('usuario creado: ', newUser.toJSON());
        

        await t.commit();

        return Sucess(req, res, creator, 200);

    } catch (error) {
        await t.rollback();
        console.log('transaccion error: ', error);
        return Error(req, res, 'the user was not created');
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