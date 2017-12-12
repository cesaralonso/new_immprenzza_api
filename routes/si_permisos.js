const router = require('express').Router();
const Si_permiso = require('../models/si_permiso');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Si_permiso.all( (error, data) => {
            return Si_permiso.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Si_permiso.count( (error, data) => {
            return Si_permiso.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Si_permiso.exist( req.params.id, (error, data) => {
            return Si_permiso.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idsi_permiso = req.params.id;
        Si_permiso.findById( idsi_permiso, (error, data) => {
            return Si_permiso.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idsi_permiso = req.params.id;
            Si_permiso.logicRemove( idsi_permiso, (error, data) => {
                return Si_permiso.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const si_permiso = req.body;
        Si_permiso.update( si_permiso, (error, data) => {
            return Si_permiso.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const si_permiso = req.body;
        si_permiso.idsi_permiso = null;
        Si_permiso.insert( si_permiso, (error, data) => {
            return Si_permiso.response(res, error, data);
        });
    })

module.exports = router;
