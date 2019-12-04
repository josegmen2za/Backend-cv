'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatosPersonales = Schema({
    date: { type: Date, default: Date.now },
    nombres: String,
    apellidos: String,
    telefono:   String,
    email: String,
    direccion: String,
    rut: String,
    informacion: String,
    habilidades: String,
    actitudes: String,
    image: String
});

module.exports = mongoose.model('Persona', DatosPersonales);
//pluraliza el nombre Article y lo pone en minuscula articles --> guarda documentos de este tipo y con esta estructura dentro de la coleccion