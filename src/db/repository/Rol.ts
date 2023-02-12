import { DataTypes, Model } from "sequelize";
import {sequelizeConnection} from '../config';

import Creator from "./Creator";

class Rol extends Model {};

Rol.init({
    rol_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    rol_name: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize: sequelizeConnection,
    modelName: 'Rol',
    tableName: 'rol',
    timestamps: false
});

Rol.hasOne(Creator, {
    foreignKey: 'rol_id',
    sourceKey: 'rol_id'
});

Creator.belongsTo(Rol, {
    foreignKey: 'rol_id',
    targetKey: 'rol_id'
});

export default Rol;