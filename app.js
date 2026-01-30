// app.js
const express = require('express');

/**
 * Cette ligne crée une instance de l'application Express.
*/
const app = express();

//je précises que les vues sont dans le dossier views
app.set('views', './views')

//je precise que nous utilison ejs pour les vues
app.set('view engine', 'ejs');

//je précise que j'utilise le dossier 'public' qui contient les fichier statics
app.use(express.static('public'));

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

    res.render('accueil')

});

app.get('/api/equipe', (req, res) => {
    console.log('Requête reçue sur /api/equipe');

    res.render('equipe')

    //type d'encodage
    //res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    //contenue qui sera afficher dans le navigateur
    //res.write("<p>Voici l'équipe de MayGourmet !</p>");

    //fin de la réponse
    //res.end();
});

app.get('/api/plats', (req, res) => {
    console.log('Requête recu sur /api/plats');

    res.render('plats')
});

app.get('/api/contact', (req, res) => {
    console.log('Requête recu sur /api/contact');

    res.render('contacts')
});


/**
 * Cette ligne exporte l'application Express pour qu'elle puisse être utilisée dans d'autres fichiers.
*/

module.exports = app;