const { Sequelize } = require("sequelize");
const Articles = require("../models/Article");
const Users = require("../models/User");
const Comments = require("../models/Comment");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  },
);

const User = require("./User");
const Comment = require("./Comment");
const Article = require("./Article");

User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

/**
 * Luego de definir los modelos, se pueden establecer relaciones entre los
 * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
 */
Users.hasMany(Comments);
Comments.belongsTo(Users);

Articles.belongsTo(Users);
Users.hasMany(Articles);

Comments.belongsTo(Articles);
Article.hasMany(Comments);




module.exports = {
  sequelize,
  User,
  Comment,
  Article,
};
