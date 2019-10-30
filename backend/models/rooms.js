'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    name: DataTypes.STRING
  }, {});
  rooms.associate = function(models) {
    // associations can be defined here
    rooms.belongsToMany(models.customers, {
      through: models.orders,
      as: "customers",
      foreignKey: "room_id",
      otherKey: "customer_id"
    })
  };
  return rooms;
};