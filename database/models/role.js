/*
    Campos:
    id: INTEGER NOT NULL AUTO_INCREMENT
    name: STRING NOT NULL
    description: STRING NULLABLE
    timestamps
*/

'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Role.hasMany(models.User, {foreignKey: 'roleId'});
        }
    };
    Role.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: 'Role',
    });
    return Role;
};