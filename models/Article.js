const { Model, DataTypes } = require("sequelize");
const moment = require('moment'); 
class Article extends Model {
  static initModel(sequelize) {
    Article.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
        },
        content: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.TEXT,
        },
        createdAt: {
          type: DataTypes.DATEONLY,
    get: function() {
       return moment(this.getDataValue('DateTime')).format('DD MMMM YYYY');
    }
      },
    },
      {
        sequelize,
        modelName: "article",
      },
    );

    return Article;
  }
}

module.exports = Article;
