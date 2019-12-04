//modulos para crear el servidor para el backend

'use strict'

//Cargar moduloes de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express(http)
var app = express();

// Cargar Ficheros rutas
var vitae_routes = require('./routes/rutas');

//MiddLewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Añadir prefijos de rutas / cargar rutas
app.use('/api', vitae_routes);


//Exportar modulo (fichero actual)
module.exports=app;
