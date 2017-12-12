const connection = require('../config/db-connection');

const Si_modulo = {};

Si_modulo.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM si_modulo HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Si_modulo.findById = (idSi_modulo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM si_modulo WHERE idsi_modulo = ? HAVING baja IS NULL OR baja = false',
    [idSi_modulo], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Si_modulo.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idsi_modulo) AS count FROM si_modulo`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Si_modulo.exist = (idSi_modulo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM si_modulo WHERE idsi_modulo = ?) AS exist', [idSi_modulo], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Si_modulo.insert = (Si_modulo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO si_modulo SET ?`, [Si_modulo], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Si_modulo agregada correctamente' });
    });
};

Si_modulo.update = (Si_modulo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE si_modulo SET ? WHERE idsi_modulo = ?', [Si_modulo, Si_modulo.idsi_modulo], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Si_modulo actualizados'});
    });
};

Si_modulo.logicRemove = (idsi_modulo, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE si_modulo SET baja = 1 WHERE idsi_modulo = ?', [idsi_modulo], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Si_modulo eliminada' });
    });
};

Si_modulo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_modulo;
