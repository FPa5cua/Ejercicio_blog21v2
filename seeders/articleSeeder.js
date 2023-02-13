const { faker } = require("@faker-js/faker");
const { Article } = require("../models");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const users = (await User.findAll()).length;
  
  for (let i = 0; i < 15; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(),
      image: faker.image.abstract(),
      createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z'),
      userId: faker.datatype.number({ 
        'min': 1, 
        'max': users
          
      })
      
      
    });
  }

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
