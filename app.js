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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//je configure les elements attendus pour me connecter à MySQL
const optionsConnexionBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Bouboule97615#",
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

//je crée une route GET pour l'API /api/equipe qui va me permettre d'afficher les membres de mon équipe
app.get('/api/equipe', (req, res) => {
    console.log('Requête reçue sur /api/equipe');

    //1. Je me connecte 
    req.getConnection((erreur, connection) => {
        if(erreur) {//je vérifie s'il y a une erreur lors de la connexion à la base de donnée
            console.log(erreur);
        } else{
            connection.query("SELECT * FROM equipe", [], (err, resultatEquipe) => {
                if (err) {
                    console.log("Erreur dans la requê SQL SELECT");
                } else {
                    console.log("mon équipe : ", resultatEquipe);

                    res.render("equipe", {resultatEquipe});
                }
            });
        }
    })


    //type d'encodage
    //res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    //contenue qui sera afficher dans le navigateur
    //res.write("<p>Voici l'équipe de MayGourmet !</p>");

    //fin de la réponse
    //res.end();
});

//API Route pour supprimer un membre de l'équipe
//Méthode : DELETE
//Exemple : localhost:3003/api/equipe/1 (pour supprimer le membre d'équipe avec l'id 1)
app.delete('/api/equipe/:id', (req, res) => {
    const idMembreEquipe = req.params.id;
    const queryDelete = "DELETE FROM equipe WHERE id = ?";

    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur suppression equipe : ", erreur);
        } else {
            connection.query(queryDelete, [idMembreEquipe], (err, resultat) => {
                if(err) {
                    console.log("Erreur requête suppression equipe : ", err);
                } else {
                    console.log("Membre d'équipe supprimé avec succès !");
                    //res.status(200).redirect('/api/equipe');
                    res.status(200).json({ routeAcceuil: "/api/equipe" });
                }
            });
        }
    });
});

/**
 * API pour ajouter un membre de l'équipe, méthode POST, route : /api/equipe
 */
app.post('/api/equipe', (req, res) => {
    const nomMembre = req.body.nomMembre;
    const prenomMembre = req.body.prenomMembre;
    const mailMembre = req.body.mailMembre;
    const telephoneMembre = req.body.telephone;
    const posteMembre = req.body.posteMembreEquipe;
    const adress_postaleMembre = req.body.adress_postaleMembre;
    const presentationMembre = req.body.presentationMembre;
    const date_recrutementMembre = req.body.date_recrutementMembre;
    const queryInsert = "INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const ordreChamps = [nomMembre, prenomMembre, mailMembre, telephoneMembre, posteMembre, adress_postaleMembre, presentationMembre, date_recrutementMembre];

    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur ajout membre equipe : ", erreur);
            return res.status(500).json({ message: "Erreur de connexion à la base de données." });
        } else {
            connection.query(queryInsert, ordreChamps, (err, nouveauMembre) => {
                if(err) {
                    console.log("Erreur d'ajout de membre d'équipe : ", err);
                    return res.status(500).json({ message: "Erreur lors de l'ajout du membre d'équipe." });
                } else {
                    console.log("Membre d'équipe ajouté avec succès !");
                    return res.redirect('/api/equipe');
                }
            });
        }
    });
});


/**
 * j'ajoute un fournisseur dans la table fournisseur, poue cela je crée une route POST pour l'API /api/fournisseur
 */
app.post('/api/fournisseur', (req, res) => {
    console.log("Corps de la requête : ", req.body);
    const nomFournisseur = req.body.nomFournisseur;
    const responsableFournisseur = req.body.responsableFournisseur;
    const emailFournisseur = req.body.emailFournisseur;
    const telephoneFournisseur = req.body.telephoneFournisseur;
    const adresseFournisseur = req.body.adresseFournisseur;
    const presentationFournisseur = req.body.presentationFournisseur;

    const requeteSQL = "INSERT INTO fournisseur (nom, responsable, adress_postale, telephone, mail, presentation_fournisseur) VALUES (?, ?, ?, ?, ?, ?)";

    const ordreChamps = [nomFournisseur, responsableFournisseur, adresseFournisseur, telephoneFournisseur, emailFournisseur, presentationFournisseur];


    console.log(req.body.nomFournisseur);
    console.log(req.body.responsableFournisseur);
    console.log(req.body.emailFournisseur);
    console.log(req.body.telephoneFournisseur);
    console.log(req.body.adresseFournisseur);
    console.log(req.body.presentationFournisseur);

    //je me connecte à la base de données pour exécuter la requete SQL d'insertion
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur de connexion à la base de données : ", erreur);
        } else {
            connection.query(requeteSQL, ordreChamps, (err, nouveauFournisseur) => {
                if(err) {
                    console.log("Erreur d'ajout de fournisseur : ", err);
                    res.status(500).json({ message: "Erreur lors de l'ajout du fournisseur." });
                } else {
                    console.log("Fournisseur ajouté avec succès !");
                    // 201 = Created, on peut aussi renvoyer l'objet créé ou une URL de redirection
                    res.status(200).redirect('/api/accueil');
                }
            });
        }
    });
});
//je crée une route GET pour l'API /api/fournisseur qui va me permettre d'afficher les fournisseurs de mon restaurant
app.get('/api/fournisseur', (req, res) => {
    res.render('fournisseur');
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