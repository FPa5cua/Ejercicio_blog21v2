function atLeastWriter(req, res, next) {
    if (req.user.roleId >= 2) { return next(); }
  res.send("No tienes los permisos requeridos")
}

module.exports = atLeastWriter;