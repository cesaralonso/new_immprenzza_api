const connection = require('../config/db-connection');

const Si_rol = {};

Si_rol.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM si_rol HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Si_rol.findById = (idSi_rol, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM si_rol WHERE idsi_rol = ? HAVING baja IS NULL OR baja = false',
    [idSi_rol], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Si_rol.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idsi_rol) AS count FROM si_rol`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Si_rol.exist = (idSi_rol, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM si_rol WHERE idsi_rol = ?) AS exist', [idSi_rol], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Si_rol.insert = (Si_rol, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO si_rol SET ?`, [Si_rol], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Si_rol agregada correctamente' });
    });
};

Si_rol.update = (Si_rol, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE si_rol SET ? WHERE idsi_rol = ?', [Si_rol, Si_rol.idsi_rol], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Si_rol actualizados'});
    });
};

Si_rol.logicRemove = (idsi_rol, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE si_rol SET baja = 1 WHERE idsi_rol = ?', [idsi_rol], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Si_rol eliminada' });
    });
};

Si_rol.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_rol;
