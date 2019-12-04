'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstudiosRealizados = Schema({
    year: String,
    instituto: String,
    lugar:   String,
    grado_obtenido: String,
    image:String
});

module.exports = mongoose.model('Estudio', EstudiosRealizados);
//pluraliza el nombre Article y lo pone en minuscula articles --> guarda documentos de este tipo y con esta estructura dentro de la coleccion