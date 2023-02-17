const { faker } = require("@faker-js/faker");
const { Role } = require("../models");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const rolesObjs = [
    {
      name: "Lector",
      description: "Comentar",
      code: 100
    },
    {
      name: "Escritor",
      description: "Lector +  CRUD de sus articulos",
      code: 200
    },
    {
      name: "Editor",
      description: "Escritor + Editar cualquier articulo, editar/borrar comentarios",
      code: 300
    },
      {
          name: "Administrador",
          description: "CRUD de cualquier entidad, eliminar usuarios",
          code: 400
      },
  ];


  await Role.bulkCreate(rolesObjs);
  console.log("[Database] Se corrió el seeder de Roles.");
};
