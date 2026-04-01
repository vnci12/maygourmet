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
 * Middleware pour se connecter à la BDD MySQL "pool" est une méthode de connexion qui permet de réutiliser les connexions à la base de données au lieu d'en créer une nouvelle à chaque requête, ce qui améliore les performances de l'application.
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
    });


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
    //je me connecte à la base de données pour exécuter la requete SQL de suppression
    req.getConnection((erreur, connection) => {
        //je vérifie s'il y a une erreur lors de la connexion à la base de donnée
        if(erreur) {
            console.log("Erreur suppression equipe : ", erreur);
        } else {
            //je exécute la requete SQL de suppression du membre d'équipe avec l'id spécifié
            connection.query(queryDelete, [idMembreEquipe], (err, resultat) => {
                //je vérifie s'il y a une erreur lors de l'exécution de la requete SQL de suppression
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
    //je récupère les données du membre d'équipe à ajouter depuis le corps de la requête
    const nomMembreEquipe = req.body.nomMembreEquipe;
    const prenomMembreEquipe = req.body.prenomMembreEquipe;
    const mailMembreEquipe = req.body.mailMembreEquipe;
    const telephoneMembreEquipe = req.body.telephoneMembreEquipe;
    const posteMembreEquipe = req.body.posteMembreEquipe;
    const adress_postaleMembreEquipe = req.body.adress_postaleMembreEquipe;
    const presentationMembreEquipe = req.body.presentationMembreEquipe;
    const date_recrutementMembreEquipe = req.body.date_recrutementMembreEquipe;
    //je prépare la requete SQL d'insertion du nouveau membre d'équipe dans la table "equipe"
    const queryInsert = "INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    //je prépare l'ordre des champs à insérer dans la table "equipe" en fonction de la requete SQL d'insertion
    const ordreChamps = [nomMembreEquipe, prenomMembreEquipe, mailMembreEquipe, telephoneMembreEquipe, posteMembreEquipe, adress_postaleMembreEquipe, presentationMembreEquipe, date_recrutementMembreEquipe];
    //je me connecte à la base de données pour exécuter la requete SQL d'insertion du nouveau membre d'équipe
    req.getConnection((erreur, connection) => {
        if(erreur) {
            //je vérifie s'il y a une erreur lors de la connexion à la base de donnée
            console.log("Erreur ajout membre equipe : ", erreur);
            //je renvoie une réponse d'erreur au client
            return res.status(500).json({ message: "Erreur de connexion à la base de données." });
        } else {
            //je exécute la requete SQL d'insertion du nouveau membre d'équipe dans la table "equipe"
            connection.query(queryInsert, ordreChamps, (err, nouveauMembre) => {
                if(err) {
                    //je vérifie s'il y a une erreur lors de l'exécution de la requete SQL d'insertion du nouveau membre d'équipe dans la table "equipe"
                    console.log("Erreur d'ajout de membre d'équipe : ", err);
                    //je renvoie une réponse d'erreur au client
                    return res.status(500).json({ message: "Erreur lors de l'ajout du membre d'équipe." });
                } else {
                    //je affiche un message de succès dans la console du serveur
                    console.log("Membre d'équipe ajouté avec succès !");
                    //je renvoie une réponse de succès au client, je peux aussi renvoyer l'objet créé ou une URL de redirection
                    return res.redirect('/api/equipe');
                }
            });
        }
    });
});

app.put('/api/equipe/:id', (req, res) => {
    // Récupère les données du membre à modifier depuis le corps de la requête
    const id = req.body.id;
    const nom = req.body.nomMembreEquipe;
    const prenom = req.body.prenomMembreEquipe;
    const mail = req.body.mailMembreEquipe;
    const telephone = req.body.telephoneMembreEquipe;
    const poste = req.body.posteMembreEquipe;
    const adress_postale = req.body.adress_postaleMembreEquipe;
    const presentation = req.body.presentationMembreEquipe;
    const date_recrutement = req.body.date_recrutementMembreEquipe;

    // Prépare la requete SQL de modification du membre d'équipe avec l'id spécifié
    const queryUpdate = `UPDATE equipe SET nom=?, prenom=?, mail=?, telephone=?, poste=?, adress_postale=?, presentation=?, date_recrutement=? WHERE id=?`;
    const ordreChamps = [nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement, id];

    req.getConnection((erreur, connection) => {
        // Je vérifie s'il y a une erreur lors de la connexion à la base de donnée
        if (erreur) {
            console.log("Erreur de connexion à la base de données : ", erreur);
            // Je renvoie une réponse d'erreur au client
            return res.status(500).json({ message: "Erreur de connexion à la base de données." });
            // Je peux aussi renvoyer une URL de redirection vers la page de l'équipe ou une autre page pertinente
        } else {
            // J'exécute la requete SQL de modification du membre d'équipe avec l'id spécifié
            connection.query(queryUpdate, ordreChamps, (err, resultat) => {
                //je vérifie s'il y a une erreur lors de l'exécution de la requete SQL de modification du membre d'équipe avec l'id spécifié
                if (err) {
                    console.log("Erreur lors de la mise à jour du membre : ", err);
                    // Je renvoie une réponse d'erreur au client
                    return res.status(500).json({ message: "Erreur lors de la mise à jour du membre." });
                    // Je peux aussi renvoyer une URL de redirection vers la page de l'équipe ou une autre page pertinente
                } else {
                    console.log("Membre d'équipe modifié avec succès !");
                    // Je renvoie une réponse de succès au client, je peux aussi renvoyer l'objet modifié ou une URL de redirection vers la page de l'équipe ou une autre page pertinente
                    return res.status(200).json({ message: "Membre modifié avec succès." });
                }
            });
        }
    });
});

/**
 * j'ajoute un fournisseur dans la table fournisseur, poue cela je crée une route POST pour l'API /api/fournisseur
 */
app.post('/api/fournisseur', (req, res) => {
    //je récupère les données du fournisseur à ajouter depuis le corps de la requête
    console.log("Corps de la requête : ", req.body);
    const nomFournisseur = req.body.nomFournisseur;
    const responsableFournisseur = req.body.responsableFournisseur;
    const emailFournisseur = req.body.emailFournisseur;
    const telephoneFournisseur = req.body.telephoneFournisseur;
    const adresseFournisseur = req.body.adresseFournisseur;
    const presentationFournisseur = req.body.presentationFournisseur;
    //je prépare la requete SQL d'insertion du nouveau fournisseur dans la table "fournisseur"
    const requeteSQL = "INSERT INTO fournisseur (nom, responsable, adress_postale, telephone, mail, presentation_fournisseur) VALUES (?, ?, ?, ?, ?, ?)";
    //je prépare l'ordre des champs à insérer dans la table "fournisseur" en fonction de la requete SQL d'insertion
    const ordreChamps = [nomFournisseur, responsableFournisseur, adresseFournisseur, telephoneFournisseur, emailFournisseur, presentationFournisseur];


    console.log(req.body.nomFournisseur);
    console.log(req.body.responsableFournisseur);
    console.log(req.body.emailFournisseur);
    console.log(req.body.telephoneFournisseur);
    console.log(req.body.adresseFournisseur);
    console.log(req.body.presentationFournisseur);

    //je me connecte à la base de données pour exécuter la requete SQL d'insertion
    req.getConnection((erreur, connection) => {
        //je vérifie s'il y a une erreur lors de la connexion à la base de donnée
        if(erreur) {
            console.log("Erreur de connexion à la base de données : ", erreur);
        } else {
            //je exécute la requete SQL d'insertion du nouveau fournisseur dans la table "fournisseur"
            connection.query(requeteSQL, ordreChamps, (err, nouveauFournisseur) => {
                //je vérifie s'il y a une erreur lors de l'exécution de la requete SQL d'insertion du nouveau fournisseur dans la table "fournisseur"
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
    console.log('Requête reçue sur /api/fournisseur');
    //je me connecte à la base de données pour récupérer les fournisseurs de mon restaurant
    req.getConnection((erreur, connection) => {
        if(erreur) {
            //je vérifie s'il y a une erreur lors de la connexion à la base de donnée
            console.log('Erreur de connexion à la base de données : ', erreur);
        } else {
            //je prépare la requête SQL pour récupérer les fournisseurs de mon restaurant
            const requeteSQL = "SELECT * FROM fournisseur";
            //je exécute la requête SQL pour récupérer les fournisseurs de mon restaurant
            connection.query(requeteSQL, (err, resultatFournisseur) => {
                if(err) {
                    console.log('Erreur lors de la récupération des fournisseurs : ', err);
                    res.status(500).json({ message: "Erreur lors de la récupération des fournisseurs." });
                } else {
                    console.log('Fournisseurs récupérés avec succès !');
                    res.render('fournisseur', { resultatFournisseur });
                }
            });
        }
    });
});

//API Route pour supprimer un fournisseur
//Méthode : DELETE
//Exemple : localhost:3003/api/fournisseur/1 (pour supprimer le fournisseur avec l'id 1)
app.delete('/api/fournisseur/:id', (req, res) => {
    const idFournisseur = req.params.id;
    const queryDelete = "DELETE FROM fournisseur WHERE id = ?";
    //je me connecte à la base de données pour exécuter la requete SQL de suppression
    req.getConnection((erreur, connection) => {
        //je vérifie s'il y a une erreur lors de la connexion à la base de donnée
        if(erreur) {
            console.log("Erreur suppression fournisseur : ", erreur);
        } else {
            //je exécute la requete SQL de suppression du fournisseur avec l'id spécifié
            connection.query(queryDelete, [idFournisseur], (err, resultat) => {
                //je vérifie s'il y a une erreur lors de l'exécution de la requete SQL de suppression              
                 if(err) {
                    console.log("Erreur requête suppression fournisseur : ", err);
                } else {
                    console.log("Fournisseur supprimé avec succès !");
                    //res.status(200).redirect('/api/fournisseur');
                    res.status(200).json({ routeAcceuil: "/api/fournisseur" });
                }
            });
        }
    });
});



//je crée une route GET pour l'API /api/fournisseur qui va me permettre d'afficher les fournisseurs de mon restaurant
app.get('/api/fournisseur', (req, res) => {
    res.render('fournisseur');
});


//je crée une route GET pour l'API /api/plats qui va me permettre d'afficher les plats proposés par mon restaurant
//je crée une route GET pour l'API /api/contact qui va me permettre d'afficher les coordonnées de contact de mon restaurant
app.get('/api/plats', (req, res) => {
    //1. Je me connecte à la base de données pour récupérer les plats proposés par mon restaurant
    req.getConnection((erreur, connection) => {
        if(erreur) {
            //je vérifie s'il y a une erreur lors de la connexion à la base de donnée
            console.log('Erreur de connexion à la base de données : ', erreur);
        } else {
            //2. Je prépare la requête SQL pour récupérer les plats proposés par mon restaurant
            const requeteSQL = "SELECT * FROM plat";
            //3. Je exécute la requête SQL pour récupérer les plats proposés par mon restaurant
            connection.query(requeteSQL, (err, resultatPlat) => {
                if(err) {
                    console.log('Erreur lors de la récupération des plats : ', err);
                    res.status(500).json({ message: "Erreur lors de la récupération des plats." });
                } else {
                    console.log('Plats récupérés avec succès !');
                    res.render('plats', { resultatPlat });
                }
            });
        }
    });
});

//API Route pour supprimer un plats
//Méthode : DELETE
//Exemple : localhost:3003/api/plats/1 (pour supprimer le plat avec l'id 1)
app.delete('/api/plats/:id', (req, res) => {
    const idPlat = req.params.id;
    const queryDelete = "DELETE FROM plat WHERE id = ?";
    //je me connecte à la base de données pour exécuter la requete SQL de suppression
    req.getConnection((erreur, connection) => {
        //je vérifie s'il y a une erreur lors de la connexion à la base de donnée
        if(erreur) {
            console.log("Erreur suppression plat : ", erreur);
        } else {
            //je exécute la requete SQL de suppression du plat avec l'id spécifié
            connection.query(queryDelete, [idPlat], (err, resultat) => {
                //je vérifie s'il y a une erreur lors de l'exécution de la requete SQL de suppression              
                 if(err) {
                    console.log("Erreur requête suppression plat : ", err);
                } else {
                    console.log("Plat supprimé avec succès !");
                    //res.status(200).redirect('/api/plats');
                    res.status(200).json({ routeAcceuil: "/api/plats" });
                }
            });
        }
    });
});


app.get('/api/contact', (req, res) => {
    console.log('Requête recu sur /api/contact');

    res.render('contacts')
});

//je crée une route GET pour l'API /api/accueil qui va me permettre d'afficher la page d'accueil de mon restaurant
app.get('/api/accueil', (req, res) => {
    console.log('Requête recu sur /api/accueil');
    res.render('accueil')
});

/**
 * Cette ligne exporte l'application Express pour qu'elle puisse être utilisée dans d'autres fichiers.
*/
module.exports =app;