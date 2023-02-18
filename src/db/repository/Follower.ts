import { Sequelize, DataTypes, Model } from "sequelize";
import {sequelizeConnection} from '../config';
import Creator from "./Creator";
import Video from "./Video";

class Follower extends Model {};

Follower.init({
    follower_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    is_following: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    creator_id: {
        type: DataTypes.BIGINT,
        references: {
            model: Creator,
            key: 'creator_id'
        }
    },
    creator_followed: {
        type: DataTypes.BIGINT,
        references: {
            model: Creator,
            key: 'creator_id'
        }
    },
}, {
    sequelize: sequelizeConnection,
    modelName: 'Follower',
    tableName: 'follower',
    timestamps: false
});

export default Follower;