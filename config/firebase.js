const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const fs = require('fs');
const path = require('path');

let serviceAccount;

// Tenta pegar do ambiente (Render) ou do arquivo local
if (process.env.FIREBASE_CONFIG_JSON) {
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_JSON);
    } catch (e) {
        console.error("Erro ao ler FIREBASE_CONFIG_JSON do ambiente");
    }
} else {
    const keyPath = path.join(__dirname, '../serviceAccountKey.json');
    if (fs.existsSync(keyPath)) {
        serviceAccount = require(keyPath);
    }
}

// Inicializa o Firebase (usando a forma modular)
let app;
try {
    if (serviceAccount) {
        app = initializeApp({
            credential: cert(serviceAccount)
        });
        console.log("Firebase Admin inicializado com sucesso.");
    }
} catch (err) {
    console.error("Erro ao inicializar Firebase Admin:", err);
}

// Exporta o auth configurado para ser usado no index.js
module.exports = getAuth(app);