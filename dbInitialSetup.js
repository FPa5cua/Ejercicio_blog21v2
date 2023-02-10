const db = require("./models");

module.exports = async () => {
  // Crear tablas:
  await db.sequelize.sync({ force: true });
  console.log("[Database] ¡Las tablas fueron creadas!");

  // Ejecutar seeders (datos de prueba):
  await require("./seeders/articleSeeder")();
  console.log("[Database] ¡Los datos de articulo fueron insertados!");

  await require("./seeders/userSeeder")();
  console.log("[Database] ¡Los datos de usuario fueron insertados!");

  await require("./seeders/commentSeeder")();
  console.log("[Database] ¡Los datos de comentario fueron insertados!");
};


