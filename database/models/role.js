'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
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
   
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        deletedAt: DataTypes.DATE
      }, {
        sequelize,
        timestamps: true,
        modelName: 'Role',
    });
    return Role;
};
=======

  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: 'roleId' });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Role',
    }
  );
  return Role;
};
>>>>>>> 2b4e43e928424f32067302bb288dc1a9750256cc
