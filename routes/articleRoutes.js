const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const atLeastAdmin = require("../middlewares/atLeastAdmin");
const atLeastEditor = require("../middlewares/atLeastEditor");
const atLeastWriter = require("../middlewares/atLeastWriter");
const atLeastLector = require("../middlewares/atLeastLector");
const authory = require("../middlewares/authory");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Rutas relacionadas a los artículos:
// ...

/* a. Lector: es el rol por defecto que tiene un usuario al registrarse al blog.
Puede hacer comentarios en cualquier artículo.

b. Escritor: mismos permisos que el lector, pero además puede hacer
CRUD (de sus propios artículos).

c. Editor: mismos permisos que el escritor, y además editar artículos de
cualquier escritor. No puede borrar artículos que no sean de su
autoría. Además puede editar y/o borrar comentarios de cualquier
artículo.

d. Administrador: puede hacer CRUD de cualquier entidad; incluyendo,
por ejemplo, eliminar usuarios. */



router.get("/", articleController.index);
router.get("/crear",isAuthenticated, atLeastWriter, articleController.create);
router.post("/", isAuthenticated,atLeastWriter, articleController.store);
router.get("/:id",isAuthenticated,atLeastLector , articleController.show);
router.get("/:id/editar",isAuthenticated,authory, articleController.edit);
router.post("/:id/update",isAuthenticated, authory, articleController.update);
router.get("/:id/eliminar", isAuthenticated, atLeastAdmin, articleController.destroy);

module.exports = router;
