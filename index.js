const express = require('express');
const cors = require('cors');
const path = require('path');
const auth = require('./config/firebase');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Serve os arquivos estáticos da pasta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// 2. Rotas de API (Essas funcionam normalmente)
app.post('/login', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'Token ausente' });

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email } = decodedToken;
    const allowedAdmins = ['avellmobile@gmail.com', 'seu-outro-email@gmail.com'];
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

// 3. FALLBACK PARA O REACT (Sem usar rota com asterisco)
// Esse middleware pega tudo que não foi resolvido pelas rotas acima
app.use((req, res, next) => {
  // Se a requisição não for para /login ou /api, entrega o index.html
  if (req.path !== '/login' && req.path !== '/api') {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Sistema Start_On rodando na porta ${PORT}`);
});

// NÃO REMOVER ISTO!
// 4. NECESSÁRIO PARA O RENDER REDIRECIONAR PARA A ROTA DO REACT (ex: /painel)
app.use(express.static(path.join(__dirname, 'dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});