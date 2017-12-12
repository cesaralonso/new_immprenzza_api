const express = require('express');
const connection = require('./config/db-connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

//Route importation.
const abono = require('./routes/abonos');
const alerta = require('./routes/alertas');
const checkout = require('./routes/checkouts');
const cliente = require('./routes/clientes');
const concepto = require('./routes/conceptos');
const egresoconcepto = require('./routes/egresoconceptos');
const modulo = require('./routes/modulos');
const orden = require('./routes/ordens');
const permiso = require('./routes/permisos');
const persona = require('./routes/personas');
const personal = require('./routes/personals');
const puesto = require('./routes/puestos');
const rol = require('./routes/rols');
const tipoalerta = require('./routes/tipoalertas');
const tipotrabajo = require('./routes/tipotrabajos');
const trabajo = require('./routes/trabajos');
const user = require('./routes/users');
const si_modulo = require('./routes/si_modulos');
const si_permiso = require('./routes/si_permisos');
const si_rol = require('./routes/si_rols');
const si_user = require('./routes/si_users');

// Express Instance
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Initialize passport
app.use(passport.initialize());

// Call passport Strategy
require('./config/passport')(passport);

// Warehouses
app.use('/abono', abono);
app.use('/alerta', alerta);
app.use('/checkout', checkout);
app.use('/cliente', cliente);
app.use('/concepto', concepto);
app.use('/egresoconcepto', egresoconcepto);
app.use('/modulo', modulo);
app.use('/orden', orden);
app.use('/permiso', permiso);
app.use('/persona', persona);
app.use('/personal', personal);
app.use('/puesto', puesto);
app.use('/rol', rol);
app.use('/tipoalerta', tipoalerta);
app.use('/tipotrabajo', tipotrabajo);
app.use('/trabajo', trabajo);
app.use('/user', user);
app.use('/si_modulo', si_modulo);
app.use('/si_permiso', si_permiso);
app.use('/si_rol', si_rol);
app.use('/si_user', si_user);

// Set port
app.listen(3400);
