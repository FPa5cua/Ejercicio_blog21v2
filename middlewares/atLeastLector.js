function atLeastLector(req, res, next) {
    if (req.user.roleId >= 1) { return next(); }
  res.send("No tienes los permisos requeridos")
}

module.exports = atLeastLector;