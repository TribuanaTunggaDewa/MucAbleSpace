'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admins', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};