const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");

// Rutas relacionadas a los comentarios:
// ...
router.post("/:articleId", commentController.showComment);

module.exports = router;
