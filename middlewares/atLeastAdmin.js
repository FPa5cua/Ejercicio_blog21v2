function atLeastAdmin(req, res, next) {
    if (req.user.roleId === 4) { return next(); }
  res.send("No tienes los permisos requeridos")
}

module.exports = atLeastAdmin;