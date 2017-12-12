const router = require('express').Router();
const Permiso = require('../models/permiso');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Permiso.all( (error, data) => {
            return Permiso.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Permiso.count( (error, data) => {
            return Permiso.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Permiso.exist( req.params.id, (error, data) => {
            return Permiso.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idpermiso = req.params.id;
        Permiso.findById( idpermiso, (error, data) => {
            return Permiso.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idpermiso = req.params.id;
            Permiso.logicRemove( idpermiso, (error, data) => {
                return Permiso.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const permiso = req.body;
        Permiso.update( permiso, (error, data) => {
            return Permiso.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const permiso = req.body;
        permiso.idpermiso = null;
        Permiso.insert( permiso, (error, data) => {
            return Permiso.response(res, error, data);
        });
    })

module.exports = router;
