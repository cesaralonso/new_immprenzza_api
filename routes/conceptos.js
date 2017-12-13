const router = require('express').Router();
const Concepto = require('../models/concepto');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Concepto.all( (error, data) => {
            return Concepto.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Concepto.count( (error, data) => {
            return Concepto.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Concepto.exist( req.params.id, (error, data) => {
            return Concepto.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idconcepto = req.params.id;
        Concepto.findById( idconcepto, (error, data) => {
            return Concepto.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idconcepto = req.params.id;
            Concepto.logicRemove( idconcepto, (error, data) => {
                return Concepto.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const concepto = req.body;
        Concepto.update( concepto, (error, data) => {
            return Concepto.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const concepto = req.body;
        concepto.idconcepto = null;
        Concepto.insert( concepto, (error, data) => {
            return Concepto.response(res, error, data);
        });
    })

module.exports = router;
