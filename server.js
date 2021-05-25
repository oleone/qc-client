const express = require('express');
const path = require('path');

const app = express();

// Servir arquivos estáticos do diretório angular
app.use(express.static('./dist'));

app.get('/*', (req, res) => 
    res.sendFile('index.html', { root: 'dist/'}),
);

// Inicialização do client sendo listado na porta default heroku ou 8080
app.listen(process.env.PORT || 8080);