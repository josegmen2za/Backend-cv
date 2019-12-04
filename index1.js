// Conexion al servidor de datos y crear servidor web del api

'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port= 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:Jg.13754596@curriculum-slh7c.mongodb.net/vitae?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => {
        
        console.log('La Conexion a la base de datos se a realizado con exito.');

        //crear servidor
        app.listen(port, ()=> {
            //app.set('port',process.env.PORT || 3000); puerto para  heroku
            console.log('Servidor corriendo en http://localhost:'+port);
        })
    });
   