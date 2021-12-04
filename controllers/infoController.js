
const listAreas = require('../data/area');
const areas = listAreas.listAreas
const facultad = require('../data/facultad')
const listFacultad = facultad.facultad;
const departamento = require('../data/departamentos')
const listDepartamentos = departamento.listDepartamentos;
const titulacion=require("../data/titulacion")
const listTitulaciones= titulacion.listTitulaciones;
const componentes=require("../data/componentes")
const listComponentes= componentes.lisComponentes;
const estudiante=require("../data/estudiantes")
const listEstudiantes=estudiante.listEstudiantes

exports.getAreas = (req, res) => {
    dir = req.get('host');

    let direcciones = [];
    areas.forEach(area => {
        direcciones.push({ rel: "self", title: area.name, method: "GET", href: "http://" + dir + "/area/" + area.idArea })
    });
    res.status(200).json({ areas }, direcciones);
}
exports.getOneArea = (req, res) => {
    const resultado = areas.find(es => es.idArea == req.params.pos);
    let areaData = clone(resultado);
    const facultadArea = []
    dir = req.get('host');

    let direcciones = [];
    if (areaData != null) {

        listFacultad.forEach(facultad => {
            if (facultad.idArea == areaData.idArea) {
                facultadArea.push(facultad)
            }
        });

        if (facultadArea.length) {
            areaData["facultad"] = facultadArea

            facultadArea.forEach(facultad => {

                direcciones.push({ rel: "self", title: facultad.nameFacultad, method: "GET", href: "http://" + dir + req.originalUrl + "/facultad/" + facultad.idFacultad })
            });
        } else {
            areaData["facultad"] = { msg: "no hay facultades registradas aun" }
        }
            direcciones.push({ rel: "self", title: "Listado de Areas", method: "GET", href: "http://" + dir + "/areas" })
        res.status(200).json(areaData, direcciones)
    } else {
        res.status(404).json({ msg: "No se encontro el area" })
    }
}
exports.getOneFacultad = (req, res) => {
    dir = req.get('host');
    const resultadoAreas = areas.find(es => es.idArea == req.params.pos);
    const resultadoFacultad = listFacultad.find(es => es.idFacultad == req.params.posfacultad);
    let facultadData = clone(resultadoFacultad);
    let departFacult = []
    let direcciones = [];
    if (resultadoAreas != null) {
        if (resultadoFacultad != null) {
            listDepartamentos.forEach(departamento => {

                if (departamento.idFacultad == resultadoFacultad.idFacultad) {
                    departFacult.push(departamento)

                }
            });
            if (departFacult.length) {
                facultadData["departamento"] = departFacult
                departFacult.forEach(departamento => {

                    direcciones.push({ rel: "self", title: departamento.name, method: "GET", href: "http://" + dir + "/departamento/" + departamento.idDepartamento })
                });
            } else {
                facultadData["departamento"] = { msg: "no hay departamentos registrados aun" }
            }
                direcciones.push({ rel: "self", title: "Listado de facultades", method: "GET", href: "http://" + dir + "/area/"+resultadoFacultad.idArea})
            res.status(200).json(facultadData,direcciones)
        } else {
            res.status(404).json({ msg: "Error no existe la facultad" })
        }

    } else {
        res.status(404).json({ msg: "Error no existe el area" })
    }

}
exports.getOneDepartaamento=(req,res)=>{
    const resultado = listDepartamentos.find(es => es.idDepartamento == req.params.pos);
    let departamentoData = clone(resultado);
    let titulacionesDepart = []
    dir = req.get('host');
    direcciones=[]
    if(resultado!=null){
        listTitulaciones.forEach(titulacion => {
            if(titulacion.idDepartamento==resultado.idDepartamento){
                console.log(titulacion)
                titulacionesDepart.push(titulacion);
            }
        });

        if(titulacionesDepart.length){
            departamentoData["titulacion"]=titulacionesDepart
            titulacionesDepart.forEach(titulacion => {
                direcciones.push({ rel: "self", title: titulacion.name, method: "GET", href: "http://" + dir + req.originalUrl + "/titulacion/" +titulacion.idTitulacion })

                });
        }else{
            departamentoData["titulacion"]={msg:"No existe titulaciones registrada"}
        }

        const facultad=listFacultad.find(es => es.idFacultad == resultado.idFacultad);
        direcciones.push({ rel: "self", title: "Listado de Departamentos", method: "GET", href: "http://" + dir+"/area/"+facultad.idArea+"/facultad/"+facultad.idFacultad })
        res.status(200).json(departamentoData,direcciones)

    }else{
        res.status(404).json({status:404,msg:"No existe el departamento"})
    }

}
exports.getOneTitulacion=(req,res)=>{
    dir = req.get('host');
    const resultadoDepartamento = listDepartamentos.find(es => es.idDepartamento == req.params.pos);
    const resultTiutlacion = listTitulaciones.find(es => es.idTitulacion == req.params.postitulacion);
    let dataTitulacion= clone(resultTiutlacion)
    let componetTitulacion=[]
    let direcciones=[]
    if(resultadoDepartamento!=null){
        if(resultTiutlacion!=null){
                listComponentes.forEach(componentes => {
                    if(componentes.idTitulacion==resultTiutlacion.idTitulacion){
                        componetTitulacion.push(componentes);
                    }
                  
                });
                if(componetTitulacion.length){
                    dataTitulacion["componentes"]=componetTitulacion
                    componetTitulacion.forEach(component => {
                        direcciones.push({ rel: "self", title: component.name, method: "GET", href: "http://" + dir  + "/componente/" +component.idComponente })

                    });
                }else{
                    dataTitulacion["componentes"]={msg:"No hay componentes registrados aun"}
                }
                direcciones.push({ rel: "self", title: "Listado de titulaciones", method: "GET", href: "http://" + dir  + "/departamento/"+resultadoDepartamento.idDepartamento })
            res.status(200).json(dataTitulacion,direcciones)
        }else{
            res.status(404).json({msg:"No se encontro la titulacion"})
        }
    }else{
        res.status(404).json({msg:"No se encontro el departamento"})
    }
}
exports.getOneComponet=(req,res)=>{
    dir = req.get('host');
    const resultado = listComponentes.find(es => es.idComponente == req.params.pos);
    let componentData = clone(resultado);
    let estudComponente=[]
    let direcciones=[]
    if(resultado!=null){
        listEstudiantes.forEach(estudiante => {
            if(estudiante.idComponente==componentData.idComponente){
                estudComponente.push(estudiante)
            }
        });
        if(estudComponente.length){
            componentData["estudiantes"]=estudComponente
            estudComponente.forEach(estudiante => {
                direcciones.push({ rel: "self", title: estudiante.name+" "+estudiante.last_name, method: "GET", href: "http://" + dir + req.originalUrl + "/estudiante/" +estudiante.idEstudiante })

            });

            
        }else{
            componentData["estudiantes"]={msg:"No hay estudiantes registrados "}
        }
        const titulacion=listTitulaciones.find(es => es.idTitulacion == componentData.idTitulacion);
        direcciones.push({ rel: "self", title: "Listado de componentes", method: "GET", href: "http://" + dir +"/departamento/"+titulacion.idDepartamento+"/titulacion/"+titulacion.idTitulacion })
        res.status(200).json(componentData,direcciones)
    }else{
        res.status(404).json({msg:"No se encontro el componente"})
    }
}

exports.getOneEstudiante=(req,res)=>{
    dir = req.get('host');
    const resultComponet = listComponentes.find(es => es.idComponente == req.params.pos);
    const resultEstudent = listEstudiantes.find(es => es.idEstudiante == req.params.posEstudent);
    if(resultComponet!=null){
        if(resultEstudent!=null){
                res.status(200).json(resultEstudent,
                    [
                        { rel: "self", title: "Listado de estudiantes", method: "GET", href: "http://" + dir  + "/componente/" +resultComponet.idComponente }
                    ])
        }else{
            res.status(404).json({msg:"Error no existe el estudiante"})
        }
    }else{
        res.status(404).json({msg:"Error no existe el componente"})
    }

}
function clone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor();
    for (var key in obj) {
        temp[key] = clone(obj[key]);
    }

    return temp;
}