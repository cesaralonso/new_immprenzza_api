const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');

router
    .get('/', (req, res, next) => {
        User.all( (error, data) => {
            return User.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        User.count( (error, data) => {
            return User.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        User.exist( req.params.id, (error, data) => {
            return User.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const iduser = req.params.id;
        User.findById( iduser, (error, data) => {
            return User.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            const iduser = req.params.id;
            User.logicRemove( iduser, (error, data) => {
                return User.response(res, error, data);
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        const user = req.body;
        User.update( user, (error, data) => {
            return User.response(res, error, data);
        })
    })
    .post('/', (req, res, next) => {
        const user = req.body;
        user.iduser = null;
        User.insert( user, (error, data) => {
            return User.response(res, error, data);
        });
    })

module.exports = router;
