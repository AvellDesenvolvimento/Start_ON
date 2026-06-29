# Cria o arquivo e adiciona a pasta node_modules (para não subir pastas pesadas)
echo "node_modules" > .gitignore

# Adiciona o arquivo de credenciais sensíveis ao .gitignore
echo "config/serviceAccountKey.json" >> .gitignore

# Opcional: Adiciona arquivos de ambiente que possamos criar no futuro
echo ".env" >> .gitignore