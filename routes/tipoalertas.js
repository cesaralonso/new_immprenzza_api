const router = require('express').Router();
const Tipoalerta = require('../models/tipoalerta');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Tipoalerta.all( (error, data) => {
            return Tipoalerta.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Tipoalerta.count( (error, data) => {
            return Tipoalerta.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Tipoalerta.exist( req.params.id, (error, data) => {
            return Tipoalerta.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idtipoalerta = req.params.id;
        Tipoalerta.findById( idtipoalerta, (error, data) => {
            return Tipoalerta.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idtipoalerta = req.params.id;
            Tipoalerta.logicRemove( idtipoalerta, (error, data) => {
                return Tipoalerta.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const tipoalerta = req.body;
        Tipoalerta.update( tipoalerta, (error, data) => {
            return Tipoalerta.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const tipoalerta = req.body;
        tipoalerta.idtipoalerta = null;
        Tipoalerta.insert( tipoalerta, (error, data) => {
            return Tipoalerta.response(res, error, data);
        });
    })

module.exports = router;
