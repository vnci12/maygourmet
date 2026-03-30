const { response } = require("express");

function supprimer(id) {
    const routeComplete = '/api/equipe/' + id;
    fetch(
        routeComplete, { method: "DELETE" }
    ).then(
            (response) => response.json()
    ).then(
            (donnee) => window.location.href = donnee.routeAcceuil
    ).catch(
            (error) => console.log(error)
    )
};

//fonction supprimer plats
//cette fonction me permetra de supprimer un plat depuis ma base de données en utilisant l'id du plat que je souhaite supprimer
function supprimerPlat(id) {
    const routeComplete ='/api/plats/' + id;
    fetch(
        routeComplete, { method: "DELETE" }
    ).then(
        (response) => response.json()
    ).then(
        (donnee) => window.location.href = donnee.routePlats
    ).catch(
        (error) => console.log(error)
    )
};



//fonction qui me permettra de modifier une commande depuis ma base de données en utilisant l'id de la commande que je souhaite modifier
function modifier(id) {
    const routeComplete = '/api/equipe/' + id;
    fetch(
        routeComplete, { method: "PUT" }
    ).then(
            (response) => response.json()
    ).then(
            (donnee) => window.location.href = donnee.routeAcceuil
    ).catch(
            (error) => console.log(error)
    )
};

//fonction qui me permettra de modifier un plat depuis ma base de données en utilisant l'id du plat que je souhaite modifier
/*function modifierPlat(id) {
    const routeComplete = '/api/plats/' + id;
    fetch(
        routeComplete, { method: "PUT" }
    ).then(
            (response) => response.json()
    ).then(
            (donnee) => window.location.href = donnee.routePlats
    ).catch(
            (error) => console.log(error)
    )
};*/