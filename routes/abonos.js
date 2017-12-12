const router = require('express').Router();
const Abono = require('../models/abono');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Abono.all( (error, data) => {
            return Abono.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Abono.count( (error, data) => {
            return Abono.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Abono.exist( req.params.id, (error, data) => {
            return Abono.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idabono = req.params.id;
        Abono.findById( idabono, (error, data) => {
            return Abono.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idabono = req.params.id;
            Abono.logicRemove( idabono, (error, data) => {
                return Abono.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const abono = req.body;
        Abono.update( abono, (error, data) => {
            return Abono.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const abono = req.body;
        abono.idabono = null;
        Abono.insert( abono, (error, data) => {
            return Abono.response(res, error, data);
        });
    })

module.exports = router;
