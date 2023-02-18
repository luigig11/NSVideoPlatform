import { Sequelize, DataTypes, Model } from "sequelize";
import {sequelizeConnection} from '../config';

class Video extends Model {};

Video.init({
    video_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    video_view: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0
    },
    video_like: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0
    },
    date_published: {
        type: DataTypes.STRING,
        allowNull: true
    },
    creation_date: {
        type: DataTypes.STRING,
        allowNull: true //cambiar esto a false y agregar un valor por default del timestamp actual
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

}, {
    sequelize: sequelizeConnection,
    modelName: 'Video',
    tableName: 'video',
    timestamps: false
});

export default Video;


