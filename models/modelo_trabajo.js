'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrabajosRealizados = Schema({
    empresa: String,
    area: String,
    cargo:   String,
    duracion: String,
    jefe: String,
    telefono: String,
    responsabilidad: String,
    logros: String,
    image: String
});

module.exports = mongoose.model('Trabajo', TrabajosRealizados);
//pluraliza el nombre Article y lo pone en minuscula articles --> guarda documentos de este tipo y con esta estructura dentro de la coleccion