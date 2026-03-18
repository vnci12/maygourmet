// Récupère la fenêtre modale
var modal = document.getElementById("myModal");

// Récupère le bouton qui ouvre la modale
var btn = document.getElementById("myBtn");

// Récupère l'élément <span> qui ferme la modale
var span = document.getElementsByClassName("close")[0];

// Lorsque l'utilisateur clique sur le bouton, ouvre la modale
btn.onclick = function() {
  modal.style.display = "block";
}

// Lorsque l'utilisateur clique sur <span> (x), ferme la modale
span.onclick = function() {
  modal.style.display = "none";
}

// Lorsque l'utilisateur clique en dehors de la modale, la ferme
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}