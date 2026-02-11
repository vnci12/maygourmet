--creation de la base de donner
CREATE DATABASE maygourmet;
-- Afficher les bases de donner
SHOW DATABASES;


--créer une table équipe
CREATE TABLE equipe (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    mail VARCHAR(100), -- ce champ est facultatif
    telephone VARCHAR(100) NOT NULL,
    poste VARCHAR(80) NOT NULL,
    adress_postale VARCHAR(255),
    presentation VARCHAR(255),
    date_recrutement DATE
);

-- afficher les tables existante
SHOW TABLES;

-- ajouter un menbres de l'équipe
INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement)
VALUES ("ZANFARANE","HAMZA","zanfaranehamza@gmail.com","0639123456","Gérant","4 rue de la mosquée 97600 Mamoudzou","Passionné de cuisine traditionnelle et moderne.", "2023-10-01");

INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement)
VALUES ("MOHAMED","ISSA","mohamedissa@gmail.com","0639123456","chef cuisinier","45 rue maweni 97640 sada","Expert en cuisine locale et internationale.", "2023-11-15");

INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement)
VALUES ("ALI","FATIMA","alifatima@gamil.com","0639123456","Responsable des commandes","12 avenue de la plage 97600 Mamoudzou","Organisée et efficace dans la gestion des approvisionnements.", "2024-01-20");

INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement)
VALUES ("ANZIE","FAROUK","anzizefarouk@gamil.com","0639123456","Cuisinier","75 avenue de la plage 97600 Mamoudzou","trés bon cuisinier, il prends son temps pour que lasesonement sois parfait, toujours responsable.", "2024-01-20");

INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement)
VALUES ("ANZIZE","AHMED","anzizeahmed@gamil.com","0639123456","Cuisinier","35 avenue de la plage 97600 Mamoudzou","trés bon cuisinier, il prends son temps pour que l'asésonement sois parfait, toujours responsable.", "2024-01-20");

-- supprimer une ligne dans le tableau
delete from equipe where id = 5;

-- table fournisseur
CREATE TABLE fournisseur IF NOT EXISTS (
    id_fournisseur INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    responsable VARCHAR(155) NOT NULL,
    mail VARCHAR(100), -- ce champ est facultatif
    telephone VARCHAR(100) NOT NULL,
    adress_postale VARCHAR(255),
    presentation_fournisseur VARCHAR(255),
    -- j'associe la table fournisseur a la table produit en utilisant l'ID_PRODUIT
    -- L'ID_PRODUIT provient de la table produit
    id_produit INT NOT NULL,
    FOREIGN KEY (id_produit) REFERENCES produit (id_produit)
);

-- ajout fournisseur
INSERT INTO table fournisseur (id_produit, nom, prenom, responsable, mail, telephone, adress_postale, presentation_fournisseur)
VALUES("")

INSERT INTO fournisseur (nom, prenom, mail, telephone, adress_postale, presentation_fournisseur)
VALUES
("IBRAHIM","HAMZA","zanfaranehamza@gmail.com","0639123456","4 rue de la mosquée 97600 Mamoudzou","nkassa."),
("IBRAHIM","HAMZA","zanfaranehamza@gmail.com","0639123456","4 rue de la mosquée 97600 Mamoudzou","landra."),
("","ahmed","zanfaranehamza@gmail.com","0639123456","4 rue de la mosquée 97665","viande de poulet, dinde, canard");

-- Créer la table 'produit'
CREATE TABLE produit(
    id_produit INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    presentation VARCHAR(155),
    prix INT NOT NULL,
    origin VARCHAR(30) NOT NULL,
    categorie VARCHAR(30),
    disponibilte Boolean DEFAULT False,
    type_culture VARCHAR(30),
    -- J'associe la table produit à la table fournisseur en utilisant les identifiants de chaque table
    id_fournisseur INT NOT NULL,
    FOREIGN KEY (id_fournisseur) REFERENCES fournisseur(id_fournisseur)
);

insert into produit (id_produit, nom, presentation, prix, origin, categorie, disponibilite, type_culture, id_fournisseur)
VALUES(1, "Kanga Passam", "magasin si qui ce situe a passamayiti prés du college, Vente de fruit/kg de mayotte.", 5, "Mayotte", "Fruit", 0, "agricole", 1);