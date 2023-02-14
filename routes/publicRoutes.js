const express = require("express");
const router = express.Router();
const publicRoutes = require("../controllers/homeController");

router.get("/", publicRoutes.home);

// Rutas relacionadas a la parte pública del sitio web:
// ...

module.exports = router; 
