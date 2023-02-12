import { Sequelize, DataTypes, Model } from "sequelize";
import {sequelizeConnection} from '../config';
import Creator from "./Creator";
import Video from "./Video";

class LikeVideo extends Model {};

LikeVideo.init({
    like_video_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    is_liked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    sequelize: sequelizeConnection,
    modelName: 'LikeVideo',
    tableName: 'like_video',
    timestamps: false
});

Creator.belongsToMany(Video, {through: LikeVideo, foreignKey: 'creator_id'});
Video.belongsToMany(Creator, {through: LikeVideo, foreignKey: 'video_id'});

export default LikeVideo;