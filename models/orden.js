const connection = require('../config/db-connection');

const Orden = {};

Orden.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM orden HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Orden.findById = (idOrden, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM orden WHERE idorden = ? HAVING baja IS NULL OR baja = false',
    [idOrden], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Orden.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idorden) AS count FROM orden`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Orden.exist = (idOrden, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM orden WHERE idorden = ?) AS exist', [idOrden], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Orden.insert = (Orden, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO orden SET ?`, [Orden], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Orden agregada correctamente' });
    });
};

Orden.update = (Orden, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE orden SET ? WHERE idorden = ?', [Orden, Orden.idorden], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Orden actualizados'});
    });
};

Orden.logicRemove = (idorden, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE orden SET baja = 1 WHERE idorden = ?', [idorden], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Orden eliminada' });
    });
};

Orden.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Orden;
