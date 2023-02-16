const Article = require("../models/Article");
const User = require("../models/User");
const Comment = require("../models/Comment");
const sequelize = require("sequelize");
const { format } = require("date-fns");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const articles = await Article.findAll({ include: User });
  if (req.isAuthenticated()) {
    res.render("articleAdmin", { articles, format });
  } else {
    res.redirect("/login");
  }

  // console.log(articles);
}

// Display the specified resource.
async function show(req, res) {
  const id = req.params.id;
  const article = await Article.findByPk(id, {
    include: [User, { model: Comment, include: User }],
  });
  return res.render("articleDetail", {
    article,
    format,
    id,
  });
}

// Show the form for creating a new resource
async function create(req, res) {
  const articles = await Article.findAll({ include: User });
  return res.render("articleCreate", {
    articles,
  });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    await Article.create({
      include: User,
      title: fields.title,
      content: fields.content,
      userId: fields.users,
      image: files.image.newFilename,
    });
  });
  return res.redirect("/articulos");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  if (req.isAuthenticated()) {
    const idParams = req.params.id;
    const article = await Article.findByPk(idParams); //articles-->article por recomendacion de Facu por ser uno solo, va en sing
    return res.render("articleEdit", {
      idParams,
      article,
    });
  } else {
    res.redirect("/login");
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  if (req.isAuthenticated()) {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const idParams = req.params.id;
      await Article.upsert({
        id: idParams,
        title: fields.title,
        content: fields.content,
        image: files.image.newFilename,
      });
    });

    return res.redirect("/articulos");
  } else {
    return res.redirect("/login");
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const idParams = req.params.id;
  await Article.destroy({
    where: { id: `${idParams}` },
  });

  return res.redirect("/articulos");
}

async function showComment(req, res) {}

// Otros handlers...
// ...

module.exports = {
  showComment,
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
