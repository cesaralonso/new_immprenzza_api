const router = require('express').Router();
const Alerta = require('../models/alerta');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Alerta.all( (error, data) => {
            return Alerta.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Alerta.count( (error, data) => {
            return Alerta.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Alerta.exist( req.params.id, (error, data) => {
            return Alerta.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idalerta = req.params.id;
        Alerta.findById( idalerta, (error, data) => {
            return Alerta.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idalerta = req.params.id;
            Alerta.logicRemove( idalerta, (error, data) => {
                return Alerta.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const alerta = req.body;
        Alerta.update( alerta, (error, data) => {
            return Alerta.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const alerta = req.body;
        alerta.idalerta = null;
        Alerta.insert( alerta, (error, data) => {
            return Alerta.response(res, error, data);
        });
    })

module.exports = router;
