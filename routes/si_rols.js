const router = require('express').Router();
const Si_rol = require('../models/si_rol');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Si_rol.all( (error, data) => {
            return Si_rol.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Si_rol.count( (error, data) => {
            return Si_rol.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Si_rol.exist( req.params.id, (error, data) => {
            return Si_rol.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idsi_rol = req.params.id;
        Si_rol.findById( idsi_rol, (error, data) => {
            return Si_rol.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idsi_rol = req.params.id;
            Si_rol.logicRemove( idsi_rol, (error, data) => {
                return Si_rol.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const si_rol = req.body;
        Si_rol.update( si_rol, (error, data) => {
            return Si_rol.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const si_rol = req.body;
        si_rol.idsi_rol = null;
        Si_rol.insert( si_rol, (error, data) => {
            return Si_rol.response(res, error, data);
        });
    })

module.exports = router;
