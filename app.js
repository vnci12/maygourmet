// app.js
const express = require('express');


//j'importe le pilote Mysql2 utilisé pour interroger la BDD MySQL
const mysql2 = require('mysql2');

/**
 * Cette ligne crée une instance de l'application Express.
*/

//j'importe le pilote express-myconnection utilisé pour me connecter à la BDD
const myConnection = require('express-myconnection');

const app = express();


//je configure les elements attendus pour me connecter à MySQL
const optionsConnexionBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Bouboule97615",
    database: "maygourmet",
    port: 3306
};

/**
 * Middleware pour se connecter à la BDD MySQL "pool" est
 */
app.use(myConnection(mysql2, optionsConnexionBaseDeDonnees, "pool"));

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