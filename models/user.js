const connection = require('../config/db-connection');

const User = {};

User.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM user HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

User.findById = (idUser, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM user WHERE iduser = ? HAVING baja IS NULL OR baja = false',
    [idUser], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

User.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(iduser) AS count FROM user`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

User.exist = (idUser, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM user WHERE iduser = ?) AS exist', [idUser], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

User.insert = (User, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO user SET ?`, [User], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'User agregada correctamente' });
    });
};

User.update = (User, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE user SET ? WHERE iduser = ?', [User, User.iduser], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la User actualizados'});
    });
};

User.logicRemove = (iduser, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE user SET baja = 1 WHERE iduser = ?', [iduser], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'User eliminada' });
    });
};

User.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = User;
