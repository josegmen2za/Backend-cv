'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var TrabajosRealizados = require('../models/modelo_trabajo');


var TrabajosRealizadosController = {

    

    saveTrabajo: (req, res) => {
        // Recoger parametros del Post
        var params = req.body;
        console.log(params);
       

        //Validar  Datos (Validator)
        try{
            var validate_empresa = !validator.isEmpty(params.empresa);
            var validate_area =!validator.isEmpty(params.area);
            var validate_cargo =!validator.isEmpty(params.cargo);
            var validate_duracion =!validator.isEmpty(params.duracion);
            var validate_jefe = !validator.isEmpty(params.jefe);
            var validate_telefono =!validator.isEmpty(params.telefono);
            var validate_responsabilidad =!validator.isEmpty(params.responsabilidad);
            var validate_logros =!validator.isEmpty(params.logros);
           
        }catch(err){
            return res.status(200).send({
                status:'error',
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_empresa && validate_area && validate_cargo && validate_duracion && validate_jefe && validate_telefono && validate_responsabilidad && validate_logros){
           //Crear objeto a Guardar
            var trabajosrealizados = new TrabajosRealizados();

            //Asignar Valores
            trabajosrealizados.empresa=params.empresa;
            trabajosrealizados.area=params.area;
            trabajosrealizados.cargo=params.cargo;
            trabajosrealizados.duracion=params.duracion;
            trabajosrealizados.jefe=params.jefe;
            trabajosrealizados.telefono=params.telefono;
            trabajosrealizados.responsabilidad=params.responsabilidad;
            trabajosrealizados.logros=params.logros;


            if(params.image){
                trabajosrealizados.image=params.image;
            }else{
                trabajosrealizados.image=null;
            }
            
            
            //Guardar los datospersonales
            trabajosrealizados.save((err, trabajosrealizadosStored) => {
                
                if(err || !trabajosrealizados){
                    return res.status(404).send({
                        status: 'error',
                        message: 'Los datos no son validos'
                    });
                }
            
                //Devolver una Respuesta
                return res.status(200).send({
                    status:'success',
                    trabajosrealizados: trabajosrealizadosStored
                });

            });
        
        }else{
            return res.status(200).send({
                status:'error',
                message: 'Los datos no son validos'
            });
        }
        
    },

    getTrabajos: (req, res) => {
        
        var query = TrabajosRealizados.find({});

        var last = req.params.last;
        
        if(last || last != undefined){
            query.limit(5)
        }
        //find
        query.sort('+_id').exec((err, TrabajosRealizados) => {

            if(err){
                return res.status(500).send({
                    status:'error',
                    message: 'Error al devolver el articulo'
                }); 
            }

            if(!TrabajosRealizados){
                return res.status(404).send({
                    status:'error',
                    message: 'No hay articulos para mostrar'
                }); 
            }

            return res.status(200).send({
                status:'success',
                TrabajosRealizados
            }); 

        }); 
    },
    getTrabajo: (req, res) => {

        // recoger el id  de la url
        var trabajorealizadosId = req.params.id;

        // comprobar que existe
        if(!trabajorealizadosId || trabajorealizadosId == null){
            return res.status(404).send({
                status:'error',
                message: 'No existe el articulo'
            }); 
        }
        //Buscar el articulo
        trabajorealizados.findById(trabajorealizadosId, (err, trabajosrealizados) => {
             
            if(err || !trabajorealizados){
                return res.status(404).send({
                    status:'error',
                    message: 'No existe el articulo'
                }); 
            }

            //Devolver el Json
            return res.status(200).send({
                status:'success',
                trabajorealizados
            }); 

        });
        
    },

    updateTrabajo: (req, res) => {
        // Recoger el id del articulo por la url
        var trabajosrealizadosId = req.params.id;

        //Recoger los datos que llegan por pùt
        var params = req.body;
        //Validar los datos
        try{
            var validate_empresa = !validator.isEmpty(params.empresa);
            var validate_area =!validator.isEmpty(params.area);
            var validate_cargo =!validator.isEmpty(params.cargo);
            var validate_duracion =!validator.isEmpty(params.duracion);
            var validate_jefe = !validator.isEmpty(params.jefe);
            var validate_telefono =!validator.isEmpty(params.telefono);
            var validate_responsabilidad =!validator.isEmpty(params.responsabilidad);
            var validate_logros =!validator.isEmpty(params.logros);
            
        }catch(err){
            return res.status(200).send({
                status:'error',
                message: 'Faltan datos por enviar'
            }); 
        }

       if(validate_empresa && validate_area && validate_cargo && validate_duracion && validate_jefe && validate_telefono && validate_responsabilidad && validate_logros ){
             // Find and update
             TrabajosRealizados.findOneAndUpdate({_id: trabajosrealizadosId}, params, {new:true}, (err, trabajosrealizadosUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if(!trabajosrealizadosUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    trabajosrealizados: trabajosrealizadosUpdated
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
    deleteTrabajo:(req, res) =>{
    //Recoger el ide de la url
    var trabajosrealizadosId = req.params.id;
    //find and delete
    TrabajosRealizados.findOneAndDelete({_id:trabajosrealizadosId}, (err, trabajosrealizadosRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!trabajosrealizadosRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se a borrado el articulo; posiblemente no exista !!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                trabajosrealizados: trabajosrealizadosRemoved
            });
        });
    },

    uploadImgTrabajo: (req, res) => {
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
        var file_split = file_path.split('/');

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
             var trabajosrealizadosId = req.params.id;
             

             if(trabajosrealizadosId){
                // Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
                TrabajosRealizados.findOneAndUpdate({_id: trabajosrealizadosId}, {image: file_name}, {new:true}, (err, trabajosrealizadosUpdated) => {

                    if(err || !trabajosrealizadosUpdated){
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen de articulo !!!'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        trabajosrealizados: trabajosrealizadosUpdated
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

    getImageTrabajo: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/imagenes/'+ file;
        console.log(path_file)        
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

    searchTrabajo: (req, res) => {
        //sacar el string a buscar
        var searchString = req.params.search;

        // find or
        trabajosrealizados.find({ "$or": [
            {"title": { "$regex": searchString, "$options": "i" }},
            { "content": {"$regex": searchString, "$options": "i" }}
        ]})
        .sort([['date', 'descending']])
        .exec((err, trabajosrealizados) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error de la petición'
                });
            }

            if(!trabajosrealizados || trabajosrealizados.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos que coincidan con la busqueda'
                });
            }

            return res.status(200).send({
                status: 'success',
                trabajosrealizados
            });
        })
    }

}; //end controller
module.exports = TrabajosRealizadosController;