'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('customers', [{
        name: 'Budi',
        identity_number:'saf-0262525',
        phone_number: '0813212xxxxxx',
        image:'https://s.kaskus.id/images/2012/12/12/2080167_20121212055324.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Asep',
        identity_number:'saf-0262525',
        phone_number: '0813212xxxxxx',
        image:'https://s.kaskus.id/images/2012/12/12/2080167_20121212055324.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Tatang',
        identity_number:'saf-0262525',
        phone_number: '0813212xxxxxx',
        image:'https://s.kaskus.id/images/2012/12/12/2080167_20121212055324.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Yudi',
        identity_number:'saf-0262525',
        phone_number: '0813212xxxxxx',
        image:'https://s.kaskus.id/images/2012/12/12/2080167_20121212055324.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }],{});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
