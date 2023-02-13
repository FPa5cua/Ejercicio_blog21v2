const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");
const { Article } = require("../models");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comments = [];
  const articles = (await Article.findAll()).length;
  const users = (await User.findAll()).length;

  for (let i = 0; i < 40; i++) {
    comments.push({
      content: faker.lorem.paragraphs(),
      articleId: faker.datatype.number({ 
        'min': 1, 
        'max': articles
          
      }),
      userId: faker.datatype.number({ 
        'min': 1, 
        'max': users
          
      })
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Comments.");
};