const { User } = require("../models");
const { findOne } = require("../models/Article");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Display a listing of the resource.
async function index(req, res) {
  return res.render("login");
}

const login = passport.authenticate("local", {
  successRedirect: "/articulos",
  failureRedirect: "/login",
});

async function logout(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  index,
  login,
  logout,
};
