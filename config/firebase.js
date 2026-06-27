// config/firebase.js
const admin = require('firebase-admin');
// Você vai precisar do seu arquivo .json de conta de serviço aqui
const serviceAccount = require('./serviceAccountKey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;