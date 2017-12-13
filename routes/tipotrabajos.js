const router = require('express').Router();
const Tipotrabajo = require('../models/tipotrabajo');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Tipotrabajo.all( (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Tipotrabajo.count( (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Tipotrabajo.exist( req.params.id, (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idtipotrabajo = req.params.id;
        Tipotrabajo.findById( idtipotrabajo, (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idtipotrabajo = req.params.id;
            Tipotrabajo.logicRemove( idtipotrabajo, (error, data) => {
                return Tipotrabajo.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const tipotrabajo = req.body;
        Tipotrabajo.update( tipotrabajo, (error, data) => {
            return Tipotrabajo.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const tipotrabajo = req.body;
        tipotrabajo.idtipotrabajo = null;
        Tipotrabajo.insert( tipotrabajo, (error, data) => {
            return Tipotrabajo.response(res, error, data);
        });
    })

module.exports = router;
