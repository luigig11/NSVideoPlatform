import { sequelizeConnection } from "../db/config";
import DBFollower from "../db/repository/Follower";
import { Follower, QueryParameters } from "../models/follower";
import { updateAmountFollowers } from "./creator.handler";

//#region Select methods

//this method get all my followers
async function getAllFollowers(query: QueryParameters): Promise<DBFollower[]> {
    const orderItem = query.orderParameter || 'follower_id';
    const orderList = query.listOrder || 'DESC';
    try {
        let followers: DBFollower[] = await DBFollower.findAll({
            where: {
                creator_followed: query.creator_followed,
                is_following: query.is_following
            },
            order: [
                [orderItem, orderList]
            ]
        });
        if (!followers) return followers;
        return followers;
    } catch (error) {
        console.log('Error while looking for followers: ', error);
        throw new Error('Could not find the followers');
    }
}

async function getFollower(query : QueryParameters): Promise<Follower | null> {
    try {
        let follower: DBFollower | null = await  DBFollower.findOne({
            where: {
                creator_id: query.creator_id,
                creator_followed: query.creator_followed
            }
        });
        if(!follower) return follower
        return follower.toJSON<Follower>()
    } catch (error) {
        console.log('Error whiile looking for follower: ', error);
        throw new Error('Could not find follower');        
    }
}


//#endregion

//#region Insert methods
async function addFollower(query: QueryParameters): Promise<Follower | number[]> {

    const t = await sequelizeConnection.transaction();
    try {
        
        const newFollower: DBFollower = await DBFollower.create({
            creator_id: query.creator_id,
            creator_followed: query.creator_followed
        }, {transaction: t});
        await updateAmountFollowers({
            id: query.creator_followed,
            is_following: true
        });
        await t.commit();
        return newFollower.toJSON<Follower>();
    } catch (error) {
        if(t) await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The follower was not created');
    }
}

//#region Update methods
async function updateFollower(query: QueryParameters): Promise<number[]> {
    const t = await sequelizeConnection.transaction();
    try {
        const follow: Array<number> = await DBFollower.update({
            is_following: query.is_following
        }, {
            where: {
                follower_id: query.follower_id
            },
        });
        await updateAmountFollowers({
            id: query.creator_followed,
            is_following: query.is_following
        });
        await t.commit();
        return follow;
    } catch (error) {
        await t.rollback();
        console.log('transaccion error: ', error);
        throw new Error('The follower was not updated');
    }
}
//#endregion

export {
    getAllFollowers,
    getFollower,
    addFollower,
    updateFollower
}