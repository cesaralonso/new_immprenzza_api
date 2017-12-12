const router = require('express').Router();
const Orden = require('../models/orden');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Orden.all( (error, data) => {
            return Orden.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Orden.count( (error, data) => {
            return Orden.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Orden.exist( req.params.id, (error, data) => {
            return Orden.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idorden = req.params.id;
        Orden.findById( idorden, (error, data) => {
            return Orden.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idorden = req.params.id;
            Orden.logicRemove( idorden, (error, data) => {
                return Orden.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const orden = req.body;
        Orden.update( orden, (error, data) => {
            return Orden.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const orden = req.body;
        orden.idorden = null;
        Orden.insert( orden, (error, data) => {
            return Orden.response(res, error, data);
        });
    })

module.exports = router;
