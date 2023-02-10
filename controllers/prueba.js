const Articles = require("../models/Article");
const sequelize = require("sequelize");

async function index(req, res) {
  const articles = await Articles.findAll();
  res.render("home", {
    articles,
  });
}

module.exports = {
  index,
};
