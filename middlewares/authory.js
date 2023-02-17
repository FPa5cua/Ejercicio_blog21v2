const Article = require("../models/Article");


async function authory(req, res, next) {
    const articleId = req.params.id;
    const user = req.user;
    const article = await Article.findByPk(articleId);
    console.log("entro al middle");
    if (user.id === article.userId || user.role.code >= 300) {
        console.log("entro al if");
        return next();
    
    }

  res.send("No tienes los permisos requeridos")
}

module.exports = authory;