const Articles = require("../models/Article");
const Users = require("../models/User");
const Comments = require("../models/Comment");
const sequelize = require("sequelize");
const { format } = require('date-fns');
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const articles = await Articles.findAll({ include: Users });
  // console.log(articles);
  return res.render("articleAdmin", {
    articles, format,
  });
}

// Display the specified resource.
async function show(req, res) {
  const id = req.params.id;
  const article = await Articles.findByPk(id, { include: [Users,  {model: Comments, include: Users} ] });  
  return res.render("articleDetail", {       
    article, format, id, 
  });
}

// Show the form for creating a new resource
async function create(req, res) {
  const articles = await Articles.findAll({ include: Users });
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
      await Articles.create({   include: Users,
          title: fields.title,
          content: fields.content,
          userId: fields.users,
          image: files.image.newFilename
        });
    });
    return res.redirect("/articulos");
  }    


// Show the form for editing the specified resource.
async function edit(req, res) {
  const idParams = req.params.id;
  const articles = await Articles.findByPk(idParams);
  return res.render("articleEdit", {
    idParams,
    articles,
  });
}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
    });  
    
    form.parse(req, async (err, fields, files) => {
      const idParams = req.params.id;
      await Articles.upsert({
          id: idParams,
          title: fields.title,
          content: fields.content,         
          image: files.image.newFilename
        });
      });
    
    return res.redirect("/articulos");

}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const idParams = req.params.id;
  await Articles.destroy({
    where: { id: `${idParams}` },
  });

  return res.redirect("/articulos");
}

async function showComment (req, res) {

}

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
