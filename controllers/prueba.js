const Articles = require("../models/Article");
const Users = require("../models/User");
const Comments = require("../models/Comment");
const sequelize = require("sequelize");
const { format } = require('date-fns');


Articles.belongsTo(Users, { notNull: true, foreignKey: { allowNull: false }});

async function index(req, res) {
  const articles = await Articles.findAll({ include: Users });
  res.render("home", {
    articles, format,
  });
}

module.exports = {
  index,
};
