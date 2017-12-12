const router = require('express').Router();
const Egresoconcepto = require('../models/egresoconcepto');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Egresoconcepto.all( (error, data) => {
            return Egresoconcepto.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Egresoconcepto.count( (error, data) => {
            return Egresoconcepto.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Egresoconcepto.exist( req.params.id, (error, data) => {
            return Egresoconcepto.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idegresoconcepto = req.params.id;
        Egresoconcepto.findById( idegresoconcepto, (error, data) => {
            return Egresoconcepto.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idegresoconcepto = req.params.id;
            Egresoconcepto.logicRemove( idegresoconcepto, (error, data) => {
                return Egresoconcepto.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const egresoconcepto = req.body;
        Egresoconcepto.update( egresoconcepto, (error, data) => {
            return Egresoconcepto.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const egresoconcepto = req.body;
        egresoconcepto.idegresoconcepto = null;
        Egresoconcepto.insert( egresoconcepto, (error, data) => {
            return Egresoconcepto.response(res, error, data);
        });
    })

module.exports = router;
