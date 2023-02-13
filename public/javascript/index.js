const deleteArticle = function (id) {
  const href = document.getElementById("delete-url");
  href.setAttribute("href", `/articulos/${id}/eliminar`);
};
