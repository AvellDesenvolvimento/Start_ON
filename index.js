const express = require('express');
// Roteador para gerenciar as rotas da API
const router = express.Router();
// Importa a configuração do Firebase Admin
const admin = require('./config/firebase');
// Habilita o CORS para permitir requisições do frontend
const cors = require('cors');
// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Define a rota POST para processar o login enviado pelo frontend
router.post('/login', async (req, res) => {
  const { idToken } = req.body; // Extrai o token de autenticação do corpo da requisição

  try {
    // Valida o token recebido diretamente no Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid; // ID único do usuário gerado pelo Firebase
    const email = decodedToken.email; // E-mail retornado pelo Google

    // Define o status de administrador se o e-mail corresponder ao configurado
    const isAdmin = (email === 'avellmobile@gmail.com');

    // Retorna os dados do usuário para o frontend caso a validação ocorra
    res.status(200).json({
      status: 'success',
      user: { uid, email, isAdmin }
    });

  } catch (error) {
    // Retorna erro 401 caso o token não seja validado ou esteja expirado
    res.status(401).send({ error: 'Token inválido ou expirado' });
  }
});

// Inicializa a instância do framework Express
const app = express();
// Define a porta do servidor a partir do .env ou padrão 3000
const PORT = process.env.PORT || 3000;

// Aplica o middleware de CORS para permitir requisições de outras origens
app.use(cors());
// Permite que o servidor processe dados no formato JSON
app.use(express.json());

// Vincula o roteador ao app para que as rotas definidas sejam acessíveis
app.use(router);

// Rota de teste para verificar se o servidor está ativo
app.get('/', (req, res) => {
    res.json({ status: "OK", message: "Amaury - On Line!" });
});

// Inicia o servidor e aguarda conexões na porta definida
app.listen(PORT, () => {
    console.log(`Sistema Start_On rodando na porta ${PORT}`);
});

module.exports = router;