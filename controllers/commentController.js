const Article = require("../models/Article");
const User = require("../models/User");
const Comment = require("../models/Comment");
const sequelize = require("sequelize");
const { format } = require("date-fns");
const formidable = require("formidable");

async function showComment(req, res) {
  if (req.isAuthenticated()) {
    const comment = {
      content: req.body.commentCreated,
      username: req.body.firstname,
      articleId: req.params.articleId,
    };
    await Comment.create(comment);
    res.redirect(`/articulos/${req.params.articleId}`);
  } else {
    res.redirect("/login");
  }
}

module.exports = {
  showComment,
};
