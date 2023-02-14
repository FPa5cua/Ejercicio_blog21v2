const Article = require("../models/Article");
const User = require("../models/User");
const Comment = require("../models/Comment");
const sequelize = require("sequelize");
const { format } = require('date-fns');


Article.belongsTo(User, { notNull: true, foreignKey: { allowNull: false }});

async function home(req, res) {
  const articles = await Article.findAll({ include: User });
  return res.render("home", {
    articles, format,
  });
}

module.exports = {
  home,
};
