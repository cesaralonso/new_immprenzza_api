const router = require('express').Router();
const Si_modulo = require('../models/si_modulo');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Si_modulo.all( (error, data) => {
            return Si_modulo.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Si_modulo.count( (error, data) => {
            return Si_modulo.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Si_modulo.exist( req.params.id, (error, data) => {
            return Si_modulo.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idsi_modulo = req.params.id;
        Si_modulo.findById( idsi_modulo, (error, data) => {
            return Si_modulo.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idsi_modulo = req.params.id;
            Si_modulo.logicRemove( idsi_modulo, (error, data) => {
                return Si_modulo.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const si_modulo = req.body;
        Si_modulo.update( si_modulo, (error, data) => {
            return Si_modulo.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const si_modulo = req.body;
        si_modulo.idsi_modulo = null;
        Si_modulo.insert( si_modulo, (error, data) => {
            return Si_modulo.response(res, error, data);
        });
    })

module.exports = router;
