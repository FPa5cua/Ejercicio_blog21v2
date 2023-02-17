const { faker } = require("@faker-js/faker");
const { User } = require("../models");
const { Role } = require("../models");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  const roles = [1, 2, 3, 4];
  const password = await bcrypt.hash("1234", 8);
  
users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: "lector@gmail.com",
      roleId: 1,
      password:await bcrypt.hash("1", 8),

});
  users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: "escritor@gmail.com",
      roleId: 2,
      password:await bcrypt.hash("2", 8),

  });
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: "editor@gmail.com",
      roleId: 3,
      password:await bcrypt.hash("3", 8),

    });
      users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: "administrador@gmail.com",
      roleId: 4,
      password: await bcrypt.hash("4", 8),

});
  
  for (let i = 0; i < 10; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      roleId: roles[Math.floor(Math.random() * roles.length)],
      password: password,

    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
