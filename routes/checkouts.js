const router = require('express').Router();
const Checkout = require('../models/checkout');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        Checkout.all( (error, data) => {
            return Checkout.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Checkout.count( (error, data) => {
            return Checkout.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Checkout.exist( req.params.id, (error, data) => {
            return Checkout.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const idcheckout = req.params.id;
        Checkout.findById( idcheckout, (error, data) => {
            return Checkout.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const idcheckout = req.params.id;
            Checkout.logicRemove( idcheckout, (error, data) => {
                return Checkout.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const checkout = req.body;
        Checkout.update( checkout, (error, data) => {
            return Checkout.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const checkout = req.body;
        checkout.idcheckout = null;
        Checkout.insert( checkout, (error, data) => {
            return Checkout.response(res, error, data);
        });
    })

module.exports = router;
