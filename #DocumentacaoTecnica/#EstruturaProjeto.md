
# PROCESSO DE CRIAÇÃO DO PROJETO:
npm init -y
npm install express cors dotenv

# 1. Configura o README inicial
echo "# Start_ON" >> README.md

# 2. Inicializa o Git localmente (nessa pasta)
git init

# 3. Prepara e commita os arquivos (incluindo o que você já criou)
git add .
git commit -m "first commit"

# 4. Define a branch principal
git branch -M main

# 5. Repositório remoto (o novo)
git remote add origin https://github.com/AvellDesenvolvimento/Start_ON.git

# 6. Sobe para o GitHub
git push -u origin main

# 7. Instalar pacotes Firebase
npm install firebase-admin


Obs:
https://dashboard.render.com/
Acessar com avellmbile@gmail.com e com a senha desta conta pelo gmail.

https://start-on.onrender.com/

Create New Service / Web Service
escolher o Serviço para linkar!
tem que estar sincronizado com o git hub da conta que vou linkar.

# 8. Sempre atualizar para o github
git add .

git status

git commit -m "Update projeto"

git push origin main