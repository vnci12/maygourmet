 // Récupère la fenêtre modale
let modal = document.querySelector("#myModal");

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

// Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  // Affiche le message dans le toast et montre le toast
  toast.textContent = message;
  toast.className = "toast show";
  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

// Fonction modifier
function modifier(id, nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement) {
  // Changer le titre du modal
  document.querySelector(".modal-header h2").textContent = "Modifier un membre";

  // Pré-remplir le formulaire
  document.getElementById("nomMembreEquipe").value = nom || "";
  document.getElementById("prenomMembreEquipe").value = prenom || "";
  document.getElementById("mailMembreEquipe").value = mail || "";
  document.getElementById("telephoneMembreEquipe").value = telephone || "";
  document.getElementById("posteMembreEquipe").value = poste || "";
  document.getElementById("adress_postaleMembreEquipe").value = adress_postale || "";
  document.getElementById("presentationMembreEquipe").value = presentation || "";
  document.getElementById("date_recrutementMembreEquipe").value = date_recrutement || "";

  // Ouvrir le modal
  modal.style.display = "block";

  // Gérer le submit du formulaire
  const form = document.querySelector("form");
  form.onsubmit = (e) => {
    e.preventDefault();
   
    const data = {
      nom: document.getElementById("nomMembreEquipe").value,
      prenom: document.getElementById("prenomMembreEquipe").value,
      mail: document.getElementById("mailMembreEquipe").value,
      telephone: document.getElementById("telephoneMembreEquipe").value,
      poste: document.getElementById("posteMembreEquipe").value,
      adresse: document.getElementById("adress_postaleMembreEquipe").value,
      presentation: document.getElementById("presentationMembreEquipe").value,
      dateRecrutement: document.getElementById("date_recrutementMembreEquipe").value
    };

    fetch(`/api/equipe/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        showToast("Modification réussie !");
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("Erreur lors de la modification");
      }
    })
    .catch(() => showToast("Erreur lors de la modification"));
  };
}
