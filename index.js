const express = require('express');
const cors = require('cors');
const path = require('path');
const auth = require('./config/firebase');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Configurações Globais
app.use(cors());
app.use(express.json());

// 1. Serve os arquivos estáticos da pasta 'dist'
// Certifique-se que o build está gerando essa pasta na raiz do projeto
app.use(express.static(path.join(__dirname, 'dist')));

// 2. Rotas de API
app.post('/login', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'Token ausente' });

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email } = decodedToken;
    const allowedAdmins = ['avellmobile@gmail.com', 'amaury.hs@gmail.com'];
    const isAdmin = allowedAdmins.includes(email);
    res.status(200).json({ status: 'success', user: { uid, email, isAdmin } });
  } catch (error) {
    console.error("Erro na autenticação:", error.message);
    res.status(401).json({ error: 'Token inválido ou expirado', details: error.message });
  }
});

app.get('/api', (req, res) => {
  res.json({ status: "OK", message: "Amaury - On Line!" });
});

// 3. FALLBACK ÚNICO PARA O REACT
// Usando regex para evitar o PathError do path-to-regexp
app.get(/.*/, (req, res) => {
  // Debug: Se o Render mostrar isso no log, sabemos que a rota caiu aqui
  console.log(`Fallback acionado para: ${req.url}`);
  
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Erro ao enviar index.html:", err);
      res.status(500).send(err);
    }
  });
});

// 4. LIGAR O SERVIDOR
app.listen(PORT, () => {
  console.log(`Sistema Start_On rodando na porta ${PORT}`);
});