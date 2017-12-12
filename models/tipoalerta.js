const connection = require('../config/db-connection');

const Tipoalerta = {};

Tipoalerta.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM tipoalerta HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Tipoalerta.findById = (idTipoalerta, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM tipoalerta WHERE idtipoalerta = ? HAVING baja IS NULL OR baja = false',
    [idTipoalerta], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Tipoalerta.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idtipoalerta) AS count FROM tipoalerta`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Tipoalerta.exist = (idTipoalerta, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM tipoalerta WHERE idtipoalerta = ?) AS exist', [idTipoalerta], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Tipoalerta.insert = (Tipoalerta, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO tipoalerta SET ?`, [Tipoalerta], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Tipoalerta agregada correctamente' });
    });
};

Tipoalerta.update = (Tipoalerta, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE tipoalerta SET ? WHERE idtipoalerta = ?', [Tipoalerta, Tipoalerta.idtipoalerta], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Tipoalerta actualizados'});
    });
};

Tipoalerta.logicRemove = (idtipoalerta, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE tipoalerta SET baja = 1 WHERE idtipoalerta = ?', [idtipoalerta], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Tipoalerta eliminada' });
    });
};

Tipoalerta.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Tipoalerta;
