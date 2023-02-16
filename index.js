require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const express = require("express");
const app = express();
const routes = require("./routes");
const { User } = require("./models");
const userController = require("./controllers/userController");
const APP_PORT = process.env.APP_PORT;
const bcrypt = require("bcryptjs");
const dbInitialSetup = require("./dbInitialSetup");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  }),
);
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, cb) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        console.log("Nombre de usuario no existe.");
        return cb(null, false, { message: "Credenciales incorrectas." });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        console.log("La contraseña es inválida.");
        return cb(null, false, { message: "Credenciales incorrectas." });
      }
      console.log("Credenciales verificadas correctamente");
      return cb(null, user);
    } catch (error) {
      cb(error);
    }
  }),
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id);
    cb(null, user); // Usuario queda disponible en req.user.
  } catch (err) {
    cb(err, User);
  }
});
app.get("/login", userController.index);
app.post("/login", userController.login);
app.post("/logout", userController.logout);

routes(app);

//dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
