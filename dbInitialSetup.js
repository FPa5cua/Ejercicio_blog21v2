const db = require("./models");

module.exports = async () => {
  // Crear tablas:
  await db.sequelize.sync({ force: true, alter: true });
  console.log("[Database] ¡Las tablas fueron creadas!");
  
  await require("./seeders/userSeeder")();
  console.log("[Database] ¡Los datos de usuario fueron insertados!");
  // Ejecutar seeders (datos de prueba):
  await require("./seeders/articleSeeder")();
  console.log("[Database] ¡Los datos de articulo fueron insertados!");


  await require("./seeders/commentSeeder")();
  console.log("[Database] ¡Los datos de comentario fueron insertados!");
};
