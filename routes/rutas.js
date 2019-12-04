'use strict'

var express = require('express');
var DatosPersonalesController = require('../controllers/controller');
var EstudiosRealizadosController = require('../controllers/controller_estudios');
var TrabajosRealizadosController = require('../controllers/controller_trabajos');
var ArticleController = require('../controllers/article');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/imagenes' });

// Rutas de prueba
router.get('/datos-personales', DatosPersonalesController.datospersonales);
router.get('/test-de-controlador', DatosPersonalesController.test);

// Rutas útiles DatosPersonalesController
router.post('/savepersona', DatosPersonalesController.savePersona);
router.get('/cvspersona/:last?', DatosPersonalesController.getPersonas);
router.get('/cvpersona/:id', DatosPersonalesController.getPersona);
router.put('/cvpersona/:id', DatosPersonalesController.updatePersona);
router.delete('/deletepersona/:id', DatosPersonalesController.deletePersona);
router.post('/cvpersona/upload-imagen/:id?', md_upload, DatosPersonalesController.uploadImgPersona);
router.get('/cvpersona/get-imagen/:image', DatosPersonalesController.getImagePersona);
router.get('/cvpersona/search/:search',DatosPersonalesController.searchPersona);

// Rutas útiles EstudiosRealizadosController
router.post('/saveestudio', EstudiosRealizadosController.saveEstudio);
router.get('/estudios/:last?', EstudiosRealizadosController.getEstudios);
router.get('/estudio/:id', EstudiosRealizadosController.getEstudio);
router.put('/estudio/:id', EstudiosRealizadosController.updateEstudio);
router.delete('/estudios/:id', EstudiosRealizadosController.deleteEstudio);
router.post('/estudios/upload-imagen/:id?', md_upload, EstudiosRealizadosController.uploadImgEstudio);
router.get('/estudios/get-image/:image', EstudiosRealizadosController.getImageEstudio);
router.get('/estudios/search/:search',EstudiosRealizadosController.searchEstudio);

// Rutas útiles trabajosrealizadoscontroller
router.post('/savetrabajo', TrabajosRealizadosController.saveTrabajo);
router.get('/trabajos/:last?', TrabajosRealizadosController.getTrabajos);
router.get('/trabajo/:id', TrabajosRealizadosController.getTrabajo);
router.put('/trabajo/:id', TrabajosRealizadosController.updateTrabajo);
router.delete('/trabajos/:id', TrabajosRealizadosController.deleteTrabajo);
router.post('/trabajos/upload-imagen/:id?', md_upload, TrabajosRealizadosController.updateTrabajo);
router.get('/trabajos/get-image/:image', TrabajosRealizadosController.getImageTrabajo);
router.get('/trabajos/search/:search',TrabajosRealizadosController.searchTrabajo);


// Rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);
router.post('/upload-imagen/:id?', md_upload, ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search',ArticleController.search);

module.exports = router;