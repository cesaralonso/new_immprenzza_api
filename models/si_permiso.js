const connection = require('../config/db-connection');

const Si_permiso = {};

Si_permiso.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM si_permiso HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Si_permiso.findById = (idSi_permiso, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM si_permiso WHERE idsi_permiso = ? HAVING baja IS NULL OR baja = false',
    [idSi_permiso], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Si_permiso.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idsi_permiso) AS count FROM si_permiso`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Si_permiso.exist = (idSi_permiso, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM si_permiso WHERE idsi_permiso = ?) AS exist', [idSi_permiso], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Si_permiso.insert = (Si_permiso, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO si_permiso SET ?`, [Si_permiso], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Si_permiso agregada correctamente' });
    });
};

Si_permiso.update = (Si_permiso, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE si_permiso SET ? WHERE idsi_permiso = ?', [Si_permiso, Si_permiso.idsi_permiso], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Si_permiso actualizados'});
    });
};

Si_permiso.logicRemove = (idsi_permiso, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE si_permiso SET baja = 1 WHERE idsi_permiso = ?', [idsi_permiso], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Si_permiso eliminada' });
    });
};

Si_permiso.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_permiso;
