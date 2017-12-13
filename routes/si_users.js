const router = require('express').Router();
const Si_user = require('../models/si_user');
const passport = require('passport');

router
    .post('/register', (req, res, next) => {
        const user = req.body;
        user.idsi_user = null;
        Si_user.register( user, (error, data) =>{
            Si_user.response(res, error, data);
        });
    })
    .post('/login', (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        Si_user.login( email, password, ( error, data ) => {
            return Si_user.response( res, error, data );
        });
    })
    // Route with authentication
    .post('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        res.send('Route Authentication Works!');
    })
    .get('/', (req, res, next) => {
        Si_user.all( (error, data) => {
            return Si_user.response(res, error, data);
        });
    })
    .get('/count', (req, res, next) => {
        Si_user.count( (error, data) => {
            return Si_user.response(res, error, data);
        });
    })
    .get('/exist/:id', (req, res, next) => {
        Si_user.exist( req.params.id, (error, data) => {
            return Si_user.response(res, error, data);
        });
    })
    .get('/:id', (req, res, next) => {
        const userId = req.params.id;
        Si_user.findById( userId, (error, data) => {
            return Si_user.response(res, error, data);
        });
    })
    .delete('/:id', (req, res, next) => {
        const userId = req.params.id;
        Si_user.remove( userId, (error, data) => {
            return Si_user.response(res, error, data);
        });
    })
    .patch('/', (req, res, next) => {
        const user = {
        iduser: req.body.iduser,
        usuario: req.body.usuario,
        password: req.body.password,
        rol_idrol: req.body.rol_idrol,
        };
        Si_user.update( user, (error, data) => {
            return Si_user.response(res, error, data);
        })
    })

module.exports = router;
