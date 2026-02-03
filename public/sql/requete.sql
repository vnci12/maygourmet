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