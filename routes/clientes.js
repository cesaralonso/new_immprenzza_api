const router = require('express').Router();
const Cliente = require('../models/cliente');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Cliente.all( (error, data) => {
            return Cliente.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Cliente.count( (error, data) => {
            return Cliente.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Cliente.exist( req.params.id, (error, data) => {
            return Cliente.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idcliente = req.params.id;
        Cliente.findById( idcliente, (error, data) => {
            return Cliente.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idcliente = req.params.id;
            Cliente.logicRemove( idcliente, (error, data) => {
                return Cliente.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const cliente = req.body;
        Cliente.update( cliente, (error, data) => {
            return Cliente.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const cliente = req.body;
        cliente.idcliente = null;
        Cliente.insert( cliente, (error, data) => {
            return Cliente.response(res, error, data);
        });
    })

module.exports = router;
