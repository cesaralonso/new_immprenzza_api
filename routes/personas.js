const router = require('express').Router();
const Persona = require('../models/persona');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Persona.all( (error, data) => {
            return Persona.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Persona.count( (error, data) => {
            return Persona.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Persona.exist( req.params.id, (error, data) => {
            return Persona.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idpersona = req.params.id;
        Persona.findById( idpersona, (error, data) => {
            return Persona.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idpersona = req.params.id;
            Persona.logicRemove( idpersona, (error, data) => {
                return Persona.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const persona = req.body;
        Persona.update( persona, (error, data) => {
            return Persona.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const persona = req.body;
        persona.idpersona = null;
        Persona.insert( persona, (error, data) => {
            return Persona.response(res, error, data);
        });
    })

module.exports = router;
