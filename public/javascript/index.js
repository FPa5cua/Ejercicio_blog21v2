const buttonDelete = document.getElementById('buttonDelete');
buttonDelete.addEventListener('click', function() {
  const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
  myModal.show();
});