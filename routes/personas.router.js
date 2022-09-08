const express = require('express');
const routerPersonas = express.Router();

//PERSONAS

const DB_PERSONAS = [];

routerPersonas.get('/', (req, res) =>{
    res.status(200).json(DB_PERSONAS);
});

routerPersonas.post('/' (req, res) =>{
    DB_PERSONAS.push(req.body);
    res.status(200).json({msg: 'Agregado!', data: req.body});
})

module.exports = routerPersonas;