//je crée le serveur  http

/**
 * Cette ligne importe le module HTTP natif de Node.js pour permettre la création de serveurs web.
*/
const http = require('http');


/**
 * Cette ligne importe l'application Express définie dans le fichier app.js.
*/
const app = require('./app');

/**
 * Cette variable définit le numéro de port sur lequel le serveur écoutera les requêtes entrantes.
*/
const numeroPort = 3003;

/**
 * Cette ligne configure le port sur lequel l'application Express écoutera les requêtes entrantes.
*/
app.set('port', numeroPort);

/**
 * Cette ligne crée un serveur HTTP en utilisant l'application Express importée.
*/
const server = http.createServer(app);

/**
 * Cette fonction démarre le serveur et affiche un message dans la console indiquant que le serveur est en cours d'exécution.
*/
server.listen(numeroPort, () => {
  console.log("Le serveur maygourmet est en cours d'exécution sur le port ", numeroPort);
});