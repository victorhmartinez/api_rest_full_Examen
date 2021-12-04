//Rutas para estudiantes
const  express=require('express');
const router=express.Router();
const infoController= require('../controllers/infoController')
router.get('/areas',infoController.getAreas)

router.get("/area/:pos",infoController.getOneArea)
router.get("/area/:pos/facultad/:posfacultad",infoController.getOneFacultad)

router.get("/departamento/:pos",infoController.getOneDepartaamento)
router.get("/departamento/:pos/titulacion/:postitulacion",infoController.getOneTitulacion)

router.get("/componente/:pos",infoController.getOneComponet)
router.get("/componente/:pos/estudiante/:posEstudent",infoController.getOneEstudiante)
module.exports = router;