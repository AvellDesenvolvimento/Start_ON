const admin = require('firebase-admin');

let serviceAccount;

try {
  // 1. Carrega o arquivo de forma local!
  serviceAccount = require('./serviceAccountKey.json');
} catch (e) {
  // 2. Se já estiver Upado para o Render vai buscar esta variavel de ambiente.
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_JSON);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;