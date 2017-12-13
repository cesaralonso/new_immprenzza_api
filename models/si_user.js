const connection = require('../config/db-connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const mySecretPass = process.env.SECRET_PASSWORD;

const Si_user = {};
Si_user.register = (user, next) => {
    if ( !connection )
        return next('Connection refused');
    // Hash password
    bcrypt.hash(user.password, saltRounds)
    .then( hash => {
        user.password = hash;
        // Insert into table
        connection.query('INSERT INTO si_user SET ?', [user], ( error, result ) => {
            if ( error ) {
                // WARNING: To take effect, user table must have the email field as unique column
                if (error.code === 'ER_DUP_ENTRY') {
                    return next( null, {
                        success: false,
                        error: error,
                        message: 'Este email ya esta en uso'
                    });
                } else
                    return next({ success: false, error: error });
            }

            return next( null, {
                success: true,
                result: result,
                message: '¡Registro exitoso!'
            });
        })
    })
    .catch( error => next({ success: false, error: error }) );
}

Si_user.login = ( email, password, next ) => {
    if ( !connection )
        return next('Connection refused');

    const query = connection.query(`
        SELECT idsi_user, email, password FROM si_user WHERE email = ?`, [email], (error, result) => {
        console.log(query.sql)
        if ( error )
            return next( error );
        if ( result[0] ) {
            const hash = result[0].password.toString();
            bcrypt.compare(password, hash, ( error, res ) => {
                if ( res ) {
                    const Si_user = {
                        idsi_user: result[0].idsi_user,
                        email: result[0].email,
                        password: hash
                    }
                    // Generate token
                    const token = jwt.sign(Si_user, mySecretPass, {
                        expiresIn: 60 * 60 * 24
                    });
                    return next( null, {
                        success: true,
                        message: 'Has iniciado sessión correctamente',
                        token: 'JWT ' + token
                    });
                } else
                    return next(null, {
                        success: false,
                        message: 'Password incorrecto'
                    });
            });
        } else {
            return next(null, {
                success: false,
                message: 'El email y password no coinciden'
            })
        }
    });
}

Si_user.all = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM si_user HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Si_user.findById = (Si_userId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT * FROM si_user WHERE idsi_user = ? HAVING baja IS NULL OR baja = false',
        [Si_userId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Si_user.count = next => {
    if ( !connection )
        return next('Connection refused');
        connection.query(`SELECT COUNT(idsi_user) AS count FROM si_user`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Si_user.exist = (Si_userId, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('SELECT EXISTS(SELECT 1 FROM si_user WHERE idsi_user = ?) AS exist', [Si_userId], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Si_user.update = (Si_user, next) => {
    if ( !connection )
        return next('Connection refused');
        connection.query('UPDATE si_user SET ? WHERE idsi_user = ?', [Si_user, Si_user.idsi_user], (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    });
};

Si_user.remove = (Si_userId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('DELETE FROM si_user WHERE idsi_user = ?', [Si_userId], (error, result) => {
        if(error) return next({ success: false, error: error, message: 'An error has happened while deleting table' });
        return next(null, { success: true, result: result, message: '¡Usuario eliminado!' });
    });
};

Si_user.logicRemove = (userId, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE si_user SET baja = 1 WHERE idsi_user = ?', [userId], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Usuario eliminado' });
    });
};

Si_user.response = (res, error, data) => {
    if (error)
        res.status(500).json(error);
    else
        res.status(200).json(data);
}

module.exports = Si_user;
