const express = require('express');
const cors = require('cors');
const auth = require('./config/firebase');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'Token ausente' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    const allowedAdmins = ['avellmobile@gmail.com', 'seu-outro-email@gmail.com'];
    const isAdmin = allowedAdmins.includes(email);

    res.status(200).json({
      status: 'success',
      user: { uid, email, isAdmin }
    });
  } catch (error) {
    console.error("Erro na autenticação:", error.message);
    res.status(401).json({ error: 'Token inválido ou expirado', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ status: "OK", message: "Amaury - On Line!" });
});

app.listen(PORT, () => {
  console.log(`Sistema Start_On rodando na porta ${PORT}`);
});