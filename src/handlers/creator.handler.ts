import DBCreator from '../db/repository/Creator';
import { sequelizeConnection } from "../db/config";
import { Creator, QueryParametrs } from "../models/creator";
import {encrypt} from '../helpers/crypto'
import { NextFunction, Request, Response } from 'express';
import { Error as NetworkError } from '../network/response';

function validateRequiredData(req: Request, res: Response, next: NextFunction) {
    const {
        name,
        lastname,
        email,
        pass,
        photo,
        rol_id
    } = req.body;

    if (!name) return NetworkError(req, res, 'required name');
    if (!lastname) return NetworkError(req, res, 'required lastname');
    if (!email) return NetworkError(req, res, 'required email');
    if (!pass) return NetworkError(req, res, 'required pass');
    if (!photo) return NetworkError(req, res, 'required photo');
    if (!rol_id) return NetworkError(req, res, 'required rol_id');

    next();
}

async function create(newCreator: Creator): Promise<Creator> {

    //validate if the creator already exists in DB
    const existingCreator = await getCreator({email: newCreator.email} as QueryParametrs);
    if (existingCreator) {
        throw new Error('already existing creator');
    }

    //Begin transaction
    const t = await sequelizeConnection.transaction();
    try {
         //encrypt password. 
         let hashedPass = await encrypt(newCreator.pass);

        //store the new creator in the DB
        const newUser: DBCreator = await DBCreator.create({
            creator_name: newCreator.name,
            creator_lastname: newCreator.lastname,
            email: newCreator.email,
            pass: hashedPass,
            photo: newCreator.photo,
            rol_id: newCreator.rol_id
        }, {transaction: t});

        console.log('usuario creado: ', newUser.toJSON());
        await t.commit();
        return newUser.toJSON();

    } catch (error) {
        await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The user was not created');
    }
}

async function getCreator(query: QueryParametrs) {
    try {

        let queryParameter = ''
        let value;

        if (query.id) {
            queryParameter = 'creator_id';
            value = query.id;
        }
        else {
            queryParameter = 'email';
            value = query.email;
        }

        let registeredCreator = await DBCreator.findOne({
            where: {
                [queryParameter]: value
            }
        });
        if (!registeredCreator) {
            return null;
        }
        return registeredCreator.toJSON();
    } catch (error) {
        console.log('Error while looking for creator: ', error);
        throw new Error('Could not find creator');
    }
        
}

export {
    create,
    validateRequiredData,
    getCreator
}