const connection = require('../config/db-connection');

const Personal = {};

Personal.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM personal HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Personal.findById = (idPersonal, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM personal WHERE idpersonal = ? HAVING baja IS NULL OR baja = false',
    [idPersonal], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Personal.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idpersonal) AS count FROM personal`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Personal.exist = (idPersonal, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM personal WHERE idpersonal = ?) AS exist', [idPersonal], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Personal.insert = (Personal, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO personal SET ?`, [Personal], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Personal agregada correctamente' });
    });
};

Personal.update = (Personal, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE personal SET ? WHERE idpersonal = ?', [Personal, Personal.idpersonal], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Personal actualizados'});
    });
};

Personal.logicRemove = (idpersonal, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE personal SET baja = 1 WHERE idpersonal = ?', [idpersonal], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Personal eliminada' });
    });
};

Personal.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Personal;
