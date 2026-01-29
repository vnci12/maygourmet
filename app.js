// app.js
const express = require('express');

/**
 * Cette ligne crée une instance de l'application Express.
*/
const app = express();

//route get pour /
app.get('/', (req, res) => {
    //message à afficher: Bienvenue chez MayGourmet !
    console.log('Requête reçue sur /');

    res.write("<p>Bienvenue chez MayGourmet !</p>");

    res.end();
});
/**
 * Route GET pour l'API d'accueil (/api/acceuil)
 * Elle renvoie un message de bienvenue en JSON.
*/
app.get('/api/acceuil', (req, res) => {
    console.log('Requête reçue sur /api/acceuil');

    //contenue qui sera afficher dans le navigateur
	res.write("<p>Bienvenue sur l'API MayGourmet !</p>");

    //type d'encodage
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    //fin de la réponse
    res.end();

});

app.get('/api/equipe', (req, res) => {
    console.log('Requête reçue sur /api/equipe');
    //type d'encodage
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    //contenue qui sera afficher dans le navigateur
    res.write("<p>Voici l'équipe de MayGourmet !</p>");

    //fin de la réponse
    res.end();
});


/**
 * Cette ligne exporte l'application Express pour qu'elle puisse être utilisée dans d'autres fichiers.
*/

module.exports = app;