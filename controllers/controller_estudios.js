'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var EstudiosRealizados = require('../models/modelo_estudios');


var EstudiosRealizadoscontroller = {

    

    saveEstudio: (req, res) => {
        // Recoger parametros del Post
        var params = req.body;
       

        //Validar  Datos (Validator)
        try{
            var validate_year = !validator.isEmpty(params.year);
            var validate_instituto =!validator.isEmpty(params.instituto);
            var validate_lugar =!validator.isEmpty(params.lugar);
            var validate_grado_obtenido =!validator.isEmpty(params.grado_obtenido);
           
        }catch(err){
            return res.status(200).send({
                status:'error',
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_year && validate_instituto && validate_lugar && validate_grado_obtenido){
           //Crear objeto a Guardar
            var estudiosrealizados = new EstudiosRealizados();

            //Asignar Valores
            estudiosrealizados.year=params.year;
            estudiosrealizados.instituto=params.instituto;
            estudiosrealizados.lugar=params.lugar;
            estudiosrealizados.grado_obtenido=params.grado_obtenido;

            if(params.image){
                estudiosrealizados.image=params.image;
            }else{
                estudiosrealizados.image=null;
            }
            
            
            //Guardar los datospersonales
            estudiosrealizados.save((err, estudiosrealizadosStored) => {
                
                if(err || !estudiosrealizados){
                    return res.status(404).send({
                        status: 'error',
                        message: 'Los datos no son validos'
                    });
                }
            
                //Devolver una Respuesta
                return res.status(200).send({
                    status:'success',
                    estudiosrealizados: estudiosrealizadosStored
                });

            });
        
        }else{
            return res.status(200).send({
                status:'error',
                message: 'Los datos no son validos'
            });
        }
        
    },

    getEstudios: (req, res) => {
        
        var query = EstudiosRealizados.find({});

        var last = req.params.last;
        
        if(last || last != undefined){
            query.limit(5)
        }
        //find
        query.sort('+_id').exec((err, EstudiosRealizados) => {

            if(err){
                return res.status(500).send({
                    status:'error',
                    message: 'Error al devolver el articulo'
                }); 
            }

            if(!EstudiosRealizados){
                return res.status(404).send({
                    status:'error',
                    message: 'No hay articulos para mostrar'
                }); 
            }

            return res.status(200).send({
                status:'success',
                EstudiosRealizados
            }); 

        }); 
    },
    getEstudio: (req, res) => {

        // recoger el id  de la url
        var estudiosrealizadosId = req.params.id;

        // comprobar que existe
        if(!estudiosrealizadosId || estudiosrealizadosId == null){
            return res.status(404).send({
                status:'error',
                message: 'No existe el articulo'
            }); 
        }
        //Buscar el articulo
        EstudiosRealizados.findById(estudiosrealizadosId, (err, EstudiosRealizados) => {
             
            if(err || !EstudiosRealizados){
                return res.status(404).send({
                    status:'error',
                    message: 'No existe el articulo'
                }); 
            }

            //Devolver el Json
            return res.status(200).send({
                status:'success',
                EstudiosRealizados
            }); 

        });
        
    },

    updateEstudio: (req, res) => {
        // Recoger el id del articulo por la url
        var estudiosrealizadosId = req.params.id;

        //Recoger los datos que llegan por pùt
        var params = req.body;
        //Validar los datos
        try{
            var validate_year = !validator.isEmpty(params.year);
            var validate_instituto =!validator.isEmpty(params.instituto);
            var validate_lugar =!validator.isEmpty(params.lugar);
            var validate_grado_obtenido =!validator.isEmpty(params.grado_obtenido);
        }catch(err){
            return res.status(200).send({
                status:'error',
                message: 'Faltan datos por enviar'
            }); 
        }

       if(validate_year && validate_instituto && validate_lugar && validate_grado_obtenido){
             // Find and update
             EstudiosRealizados.findOneAndUpdate({_id: estudiosrealizadosId}, params, {new:true}, (err, estudiosrealizadosUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if(!estudiosrealizadosUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    estudiosrealizados: estudiosrealizadosUpdated
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
    deleteEstudio:(req, res) =>{
    //Recoger el ide de la url
    var estudiosrealizadosId = req.params.id;
    //find and delete
    EstudiosRealizados.findOneAndDelete({_id:estudiosrealizadosId}, (err, estudiosrealizadosRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!estudiosrealizadosRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se a borrado el articulo; posiblemente no exista !!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                estudiosrealizados: estudiosrealizadosRemoved
            });
        });
    },

    uploadImgEstudio: (req, res) => {
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
        //var file_split = file_path.split('\\');

        // * ADVERTENCIA * EN LINUX O MAC
         var file_split = file_path.split('/');

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
             var estudiosrealizadosId = req.params.id;
             

             if(estudiosrealizadosId){
                // Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
                EstudiosRealizados.findOneAndUpdate({_id: estudiosrealizadosId}, {image: file_name}, {new:true}, (err, estudiosrealizadosUpdated) => {

                    if(err || !estudiosrealizadosUpdated){
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen de articulo !!!'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        estudiosrealizados: estudiosrealizadosUpdated
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

    getImageEstudio: (req, res) => {
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

    searchEstudio: (req, res) => {
        //sacar el string a buscar
        var searchString = req.params.search;

        // find or
        EstudiosRealizados.find({ "$or": [
            {"instituto": { "$regex": searchString, "$options": "i" }},
            { "grado_obtenido": {"$regex": searchString, "$options": "i" }}
        ]})
        .sort([['date', 'descending']])
        .exec((err, estudiosrealizados) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error de la petición'
                });
            }

            if(!estudiosrealizados || estudiosrealizados.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos que coincidan con la busqueda'
                });
            }

            return res.status(200).send({
                status: 'success',
                estudiosrealizados
            });
        })
    }

}; //end controller
module.exports = EstudiosRealizadoscontroller;