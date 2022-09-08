const express = require('express');
const morgan = require('morgan');
const exphds = require('express-handlebars')
const path = require('path');

//---------------------Instancia de Server
const app = express();
const routerProductos = require('./routes/productos.router.js');

//---------------------Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    console.log(`Middleware de App se ejecuta con todos`)
    next();
});

//Motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphds.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

//---------------------RUTAS
app.use('/api/productos', routerProductos);

app.get('/', (req,res) => {
    res.send('Proyecto Handlebars ejecutandose!');
})
app.get('/que-producto', (req,res) => {
    res.render('productos', {nombre:'Teclado Redragon', precio:'4000', categoria:'teclados', descuento:'10',stock:'5'});
});

//Middlewate de ERROR
app.use((err, req, res, next)=>{
    res.status(err.status || 500).send('Something broke!');
});


//---------------------SERVIDOR
const PORT = 8081;
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error =>{
    console.error(`Error en el servidor ${error}`);
})