import DBCreator from '../db/repository/Creator';
import { sequelizeConnection } from "../db/config";
import { Creator, QueryParametrs } from "../models/creator";
import {encrypt} from '../helpers/crypto'
import { NextFunction, Request, Response } from 'express';
import { Error as NetworkError } from '../network/response';

function validateRequiredData(req: Request, res: Response, next: NextFunction) {
    const {
        creator_name,
        creator_lastname,
        email,
        pass,
        photo,
        rol_id
    } = req.body as Creator;

    if (!creator_name) return NetworkError(req, res, 'required name');
    if (!creator_lastname) return NetworkError(req, res, 'required lastname');
    if (!email) return NetworkError(req, res, 'required email');
    if (!pass) return NetworkError(req, res, 'required pass');
    if (!photo) return NetworkError(req, res, 'required photo');
    if (!rol_id) return NetworkError(req, res, 'required rol_id');

    next();
}

//#region Get methods
async function getCreator(query: QueryParametrs): Promise<Creator | null> {
    try {

        let queryParameter = query.id ? 'creator_id' : 'email'
        let value = (queryParameter === 'creator_id') ? query.id : query.email;

        let registeredCreator = await DBCreator.findOne({
            where: {
                [queryParameter]: value
            }
        });
        if (!registeredCreator) return registeredCreator;
        return registeredCreator.toJSON<Creator>();
    } catch (error) {
        console.log('Error while looking for creator: ', error);
        throw new Error('Could not find creator');
    }
        
}
//#endregion

//#region Post methods

async function create(newCreator: Creator): Promise<Creator> {

    //validate if the creator already exists in DB
    const existingCreator: Creator | null = await getCreator({email: newCreator.email} as QueryParametrs);
    if (existingCreator) throw new Error('already existing creator');

    //Begin transaction
    const t = await sequelizeConnection.transaction();
    try {
         //encrypt password. 
         let hashedPass = await encrypt(newCreator.pass);

        //store the new creator in the DB
        const newUser: DBCreator = await DBCreator.create({
            creator_name: newCreator.creator_name,
            creator_lastname: newCreator.creator_lastname,
            email: newCreator.email,
            pass: hashedPass,
            photo: newCreator.photo,
            rol_id: newCreator.rol_id
        }, {transaction: t});

        console.log('usuario creado: ', newUser.toJSON<Creator>());
        await t.commit();
        return newUser.toJSON<Creator>();

    } catch (error) {
        await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The user was not created');
    }
}

//#endregion

//#region Put methods

async function update(query: Creator): Promise<Array<number>> {
    const creator: Creator | null = await getCreator(query);
    if (!creator) throw new Error('creator not founded');
    const t = await sequelizeConnection.transaction();
    try {        
        const updateCreator: Array<number> = await DBCreator.update({
            creator_name: query.creator_name,
            creator_lastname: query.creator_lastname,
            photo: query.photo,
        }, {
            where: {
                creator_id: query.creator_id
            }
        });
        await t.commit();
        return updateCreator;
    } catch (error) {
        await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The creator was not updated');
    }
}

//#endregion

export {
    create,
    validateRequiredData,
    getCreator,
    update
}