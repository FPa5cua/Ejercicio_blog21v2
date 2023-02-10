const express = require("express");
const router = express.Router();
const publicRoutes = require("../controllers/prueba");

router.get("/", publicRoutes.index);

// Rutas relacionadas a la parte pública del sitio web:
// ...

module.exports = router;
