const express = require('express')

// Configuração de rotas da api.
const routes = require('./resources/routes.js')

const server = express()

// Retorno JSON default
server.use(express.json())

// Usar as rotas
server.use(routes)

//Escutar na porta. 
server.listen(3333)

