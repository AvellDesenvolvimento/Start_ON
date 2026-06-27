const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota de retorno para garantir que está rodando
app.get('/', (req, res) => {
    res.json({ status: "OK", message: "Amaury - On Line!" });
});

app.listen(PORT, () => {
    console.log(`Sistema Start_On rodando na porta ${PORT}`);
});