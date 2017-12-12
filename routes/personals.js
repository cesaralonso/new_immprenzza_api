const router = require('express').Router();
const Personal = require('../models/personal');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Personal.all( (error, data) => {
            return Personal.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Personal.count( (error, data) => {
            return Personal.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Personal.exist( req.params.id, (error, data) => {
            return Personal.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idpersonal = req.params.id;
        Personal.findById( idpersonal, (error, data) => {
            return Personal.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idpersonal = req.params.id;
            Personal.logicRemove( idpersonal, (error, data) => {
                return Personal.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const personal = req.body;
        Personal.update( personal, (error, data) => {
            return Personal.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const personal = req.body;
        personal.idpersonal = null;
        Personal.insert( personal, (error, data) => {
            return Personal.response(res, error, data);
        });
    })

module.exports = router;
