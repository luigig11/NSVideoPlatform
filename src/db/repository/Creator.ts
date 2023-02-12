import { Sequelize, DataTypes, Model } from "sequelize";
import {sequelizeConnection} from '../config';
import Video from "./Video";
import {Creator as CreatorModel} from '../../models/creator'

class Creator extends Model {};

Creator.init({
    creator_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    creator_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creator_lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    followers: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    sequelize: sequelizeConnection,
    modelName: 'Creator',
    tableName: 'creator',
    timestamps: false
});

//Associations

Creator.hasMany(Video, {
    foreignKey: 'creator_id',
    sourceKey: 'creator_id'
});

Video.belongsTo(Creator, {
    foreignKey: 'creator_id',
    targetKey: 'creator_id'
});

export default Creator;
