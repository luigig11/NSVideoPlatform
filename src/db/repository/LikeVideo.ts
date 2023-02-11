/* import { Sequelize, DataTypes, Model } from "sequelize";
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
    creator_id: {
        type: DataTypes.BIGINT,
        references: {
            model: Creator,
            key: 'creator_id'
        }
    },
    video_id: {
        type: DataTypes.BIGINT,
        references: {
            model: Video,
            key: 'video_id'
        }
    },
    is_liked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    sequelize: sequelizeConnection,
    modelName: 'LikeVideo',
    tableName: 'like_video'
});
 */
/* Creator.belongsToMany(Video, {through: LikeVideo});
Video.belongsToMany(Creator, {through: LikeVideo}); */

/* export default LikeVideo; */