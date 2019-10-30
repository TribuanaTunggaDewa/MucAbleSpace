'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    name: DataTypes.STRING,
    identity_number: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  customers.associate = function(models) {
    // associations can be defined here
    customers.belongsToMany(models.rooms, {
      through: models.orders,
      as: "rooms",
      foreignKey: "customer_id",
      otherKey: "room_id"
    })
  };
  return customers;
};