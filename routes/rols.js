const router = require('express').Router();
const Rol = require('../models/rol');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Rol.all( (error, data) => {
            return Rol.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Rol.count( (error, data) => {
            return Rol.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Rol.exist( req.params.id, (error, data) => {
            return Rol.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idrol = req.params.id;
        Rol.findById( idrol, (error, data) => {
            return Rol.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idrol = req.params.id;
            Rol.logicRemove( idrol, (error, data) => {
                return Rol.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const rol = req.body;
        Rol.update( rol, (error, data) => {
            return Rol.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const rol = req.body;
        rol.idrol = null;
        Rol.insert( rol, (error, data) => {
            return Rol.response(res, error, data);
        });
    })

module.exports = router;
