'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      name: 'John Doe',
      email: "123@123",
      password: await bcrypt.hash('123', 10),
      },
      {
        name: 'Владислав Песков',
        email: "xfemidax@mail.ru",
        password: await bcrypt.hash('123', 10),
        }
    ], {});
    await queryInterface.bulkInsert(
      'Tasks', [
        {
          userId: 1,
          name: 'Alice',
          description: 'New York',
          deadlines: 'tomorrow',
          image: 'https://c.wallhere.com/photos/75/a9/1200x800_px_city_Far_View_Metropolis_New_York_State_Skyscraper-1312139.jpg!d',
          status: '1000',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          name: 'Vladislav',
          description: 'Elbrus',
          deadlines: 'today',
          image: 'https://c.wallhere.com/photos/75/a9/1200x800_px_city_Far_View_Metropolis_New_York_State_Skyscraper-1312139.jpg!d',
          status: 'in work',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          name: 'Alice',
          description: 'Paris',
          deadlines: 'tomorrow',
          image: 'https://c.wallhere.com/photos/75/a9/1200x800_px_city_Far_View_Metropolis_New_York_State_Skyscraper-1312139.jpg!d',
          status: 'onLine',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
