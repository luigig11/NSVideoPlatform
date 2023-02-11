/* import { Sequelize, DataTypes, Model } from "sequelize";
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
    decription: {
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
        allowNull: true
    },
    video_like: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    date_post: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

}, {
    sequelize: sequelizeConnection,
    modelName: 'Video',
    tableName: 'video'
});

export default Video;


 */