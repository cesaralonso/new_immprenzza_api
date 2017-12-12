const connection = require('../config/db-connection');

const Abono = {};

Abono.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM abono HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Abono.findById = (idAbono, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM abono WHERE idabono = ? HAVING baja IS NULL OR baja = false',
    [idAbono], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Abono.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idabono) AS count FROM abono`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Abono.exist = (idAbono, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM abono WHERE idabono = ?) AS exist', [idAbono], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Abono.insert = (Abono, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO abono SET ?`, [Abono], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Abono agregada correctamente' });
    });
};

Abono.update = (Abono, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE abono SET ? WHERE idabono = ?', [Abono, Abono.idabono], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Abono actualizados'});
    });
};

Abono.logicRemove = (idabono, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE abono SET baja = 1 WHERE idabono = ?', [idabono], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Abono eliminada' });
    });
};

Abono.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Abono;
