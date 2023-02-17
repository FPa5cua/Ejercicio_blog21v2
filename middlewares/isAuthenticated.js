function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
  res.send("No tienes los permisos requeridos")
}

module.exports = isAuthenticated;