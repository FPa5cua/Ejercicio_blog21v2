function atLeastEditor(req, res, next) {
    if (req.user.roleId >=  3) { return next(); }
  res.send("No tienes los permisos requeridos")
}

module.exports = atLeastEditor;