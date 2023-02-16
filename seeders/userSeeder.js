const { faker } = require("@faker-js/faker");
const { User } = require("../models");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  // const articles = (await Article.findAll()).length;
  const password = await bcrypt.hash("1234", 8);

  for (let i = 0; i < 10; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: password,

      // userId: faker.datatype.number({
      //   'min': 1,
      //   'max': users

      // })
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
