//Modulo de express para el servidor
const express = require("express");
//configuracion del servidor
const app = express();
//Modulo de HATEOAS
var hateoasLinker = require('express-hateoas-links');

app.use(express.json());
app.use(hateoasLinker);

app.use('',require('./routes/infoRoutes'))
//Asignacion del puerto 
 app.listen(3000,()=>{
    console.log('listening on port 3000');
 });