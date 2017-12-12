const router = require('express').Router();
const Trabajo = require('../models/trabajo');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Trabajo.all( (error, data) => {
            return Trabajo.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Trabajo.count( (error, data) => {
            return Trabajo.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Trabajo.exist( req.params.id, (error, data) => {
            return Trabajo.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idtrabajo = req.params.id;
        Trabajo.findById( idtrabajo, (error, data) => {
            return Trabajo.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idtrabajo = req.params.id;
            Trabajo.logicRemove( idtrabajo, (error, data) => {
                return Trabajo.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const trabajo = req.body;
        Trabajo.update( trabajo, (error, data) => {
            return Trabajo.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const trabajo = req.body;
        trabajo.idtrabajo = null;
        Trabajo.insert( trabajo, (error, data) => {
            return Trabajo.response(res, error, data);
        });
    })

module.exports = router;
