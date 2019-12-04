'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Datospersonales = require('../models/modelo1');


var controller = {

    datospersonales: (req, res) => {
        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Currículum',
            autor: 'Jose Mendoza',
            url:'www.men2za.000webhostapp.com',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de articulos'
        });
    },

    savePersona: (req, res) => {
        // Recoger parametros del Post
        var params = req.body;
        
       

        //Validar  Datos (Validator)
        try{
            var validate_nombres = !validator.isEmpty(params.nombres);
            var validate_apellidos =!validator.isEmpty(params.apellidos);
            var validate_telefono =!validator.isEmpty(params.telefono);
            var validate_email =!validator.isEmpty(params.email);
            var validate_direccion =!validator.isEmpty(params.direccion);
            var validate_rut =!validator.isEmpty(params.rut);
            var validate_informacion =!validator.isEmpty(params.informacion);
            var validate_habilidades =!validator.isEmpty(params.habilidades);
            var validate_actitudes =!validator.isEmpty(params.actitudes);

        }catch(err){
            return res.status(200).send({
                status:'error',
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_nombres && validate_apellidos && validate_telefono && validate_email && validate_direccion && validate_rut && validate_informacion && validate_habilidades && validate_actitudes ){
           //Crear objeto a Guardar
            var datospersonales = new Datospersonales();

            //Asignar Valores
            datospersonales.nombres=params.nombres;
            datospersonales.apellidos=params.apellidos;
            datospersonales.telefono=params.telefono;
            datospersonales.email=params.email;
            datospersonales.direccion=params.direccion;
            datospersonales.rut=params.rut;
            datospersonales.informacion=params.informacion;
            datospersonales.habilidades=params.habilidades;
            datospersonales.actitudes=params.actitudes;

            if(params.image){
                datospersonales.image=params.image;
            }else{
                datospersonales.image=null;
            }
            
            
            //Guardar los datospersonales
            datospersonales.save((err, datospersonalesStored) => {

                if(err || !datospersonales){
                    return res.status(404).send({
                        status: 'error',
                        message: 'Los datos no son validos'
                    });
                }
            
                //Devolver una Respuesta
                return res.status(200).send({
                    status:'success',
                    datospersonales: datospersonalesStored
                });

            });
        
        }else{
            return res.status(200).send({
                status:'error',
                message: 'Los datos no son validos'
            });
        }
        
    },

    getPersonas: (req, res) => {

        var query = Datospersonales.find({});

        var last = req.params.last;
        
        if(last || last != undefined){
            query.limit(5)
        }
        //find
        query.sort('-_id').exec((err, datospersonales) => {

            if(err){
                return res.status(500).send({
                    status:'error',
                    message: 'Error al devolver el articulo'
                }); 
            }

            if(!datospersonales){
                return res.status(404).send({
                    status:'error',
                    message: 'No hay articulos para mostrar'
                }); 
            }

            return res.status(200).send({
                status:'success',
                datospersonales
            }); 

        }); 
    },
    getPersona: (req, res) => {

        // recoger el id  de la url
        var datospersonalesId = req.params.id;

        // comprobar que existe
        if(!datospersonalesId || datospersonalesId == null){
            return res.status(404).send({
                status:'error',
                message: 'No existe el articulo'
            }); 
        }
        //Buscar el articulo
        Datospersonales.findById(datospersonalesId, (err, datospersonales) => {
             
            if(err || !datospersonales){
                return res.status(404).send({
                    status:'error',
                    message: 'No existe el articulo'
                }); 
            }

            //Devolver el Json
            return res.status(200).send({
                status:'success',
                datospersonales
            }); 

        });
        
    },

    updatePersona: (req, res) => {
        // Recoger el id del articulo por la url
        var datospersonalesId = req.params.id;

        //Recoger los datos que llegan por pùt
        var params = req.body;
        //Validar los datos
        try{
            var validate_nombres = !validator.isEmpty(params.nombres);
            var validate_apellidos =!validator.isEmpty(params.apellidos);
            var validate_telefono =!validator.isEmpty(params.telefono);
            var validate_email =!validator.isEmpty(params.email);
            var validate_direccion =!validator.isEmpty(params.direccion);
            var validate_rut =!validator.isEmpty(params.rut);
            var validate_informacion =!validator.isEmpty(params.informacion);
            var validate_habilidades =!validator.isEmpty(params.habilidades);
            var validate_actitudes =!validator.isEmpty(params.actitudes);
        }catch(err){
            return res.status(200).send({
                status:'error',
                message: 'Faltan datos por enviar'
            }); 
        }

       if(validate_nombres && validate_apellidos && validate_telefono && validate_email && validate_direccion && validate_rut && validate_informacion && validate_habilidades && validate_actitudes ){
             // Find and update
             Datospersonales.findOneAndUpdate({_id: datospersonalesId}, params, {new:true}, (err, datospersonalesUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if(!datospersonalesUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    datospersonales: datospersonalesUpdated
                });
             });
        }else{
            //Devolver respuesta
            return res.status(200).send({
                status:'error',
                message: 'La validacion no es correcta'
            }); 
        }
        
    },
    deletePersona:(req, res) =>{
    //Recoger el ide de la url
    var datospersonalesId = req.params.id;
    //find and delete
    Datospersonales.findOneAndDelete({_id:datospersonalesId}, (err, datospersonalesRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!datospersonalesRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se a borrado el articulo; posiblemente no exista !!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                datospersonales: datospersonalesRemoved
            });
        });
    },

    uploadImgPersona: (req, res) => {
        // Configurar el modulo connect multiparty router/article.js (hecho)

        // Recoger el fichero de la petición
        var file_name = 'Imagen no subida...';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Conseguir nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // * ADVERTENCIA * EN LINUX O MAC
        // var file_split = file_path.split('/');

        // Nombre del archivo
        var file_name = file_split[2];

        // Extensión del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        // Comprobar la extension, solo imagenes, si es valida borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            
            // borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida !!!'
                });
            });
        
        }else{
             // Si todo es valido, sacando id de la url
             var datospersonalesId = req.params.id;
             

             if(datospersonalesId){
                // Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
                Datospersonales.findOneAndUpdate({_id: datospersonalesId}, {image: file_name}, {new:true}, (err, datospersonalesUpdated) => {

                    if(err || !datospersonalesUpdated){
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen de articulo !!!'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        datospersonales: datospersonalesUpdated
                    });
                });
             }else{
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
             }
            
        }   
    }, // end upload file

    getImagePersona: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/imagenes/'+ file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe !!!'
                });
            }
        });
    },

    searchPersona: (req, res) => {
        //sacar el string a buscar
        var searchString = req.params.search;

        // find or
        Datospersonales.find({ "$or": [
            {"nombres": { "$regex": searchString, "$options": "i" }},
            { "apellidos": {"$regex": searchString, "$options": "i" }}
        ]})
        .sort([['date', 'descending']])
        .exec((err, datospersonales) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error de la petición'
                });
            }

            if(!datospersonales || datospersonales.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos que coincidan con la busqueda'
                });
            }

            return res.status(200).send({
                status: 'success',
                datospersonales
            });
        })
    }

}; //end controller
module.exports = controller;