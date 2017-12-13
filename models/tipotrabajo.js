const connection = require('../config/db-connection');

const Tipotrabajo = {};

Tipotrabajo.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM tipotrabajo HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Tipotrabajo.findById = (idTipotrabajo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM tipotrabajo WHERE idtipotrabajo = ? HAVING baja IS NULL OR baja = false',
    [idTipotrabajo], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Tipotrabajo.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idtipotrabajo) AS count FROM tipotrabajo`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Tipotrabajo.exist = (idTipotrabajo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM tipotrabajo WHERE idtipotrabajo = ?) AS exist', [idTipotrabajo], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Tipotrabajo.insert = (Tipotrabajo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO tipotrabajo SET ?`, [Tipotrabajo], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Tipotrabajo agregada correctamente' });
    });
};

Tipotrabajo.update = (Tipotrabajo, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE tipotrabajo SET ? WHERE idtipotrabajo = ?', [Tipotrabajo, Tipotrabajo.idtipotrabajo], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Tipotrabajo actualizados'});
    });
};

Tipotrabajo.logicRemove = (idtipotrabajo, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE tipotrabajo SET baja = 1 WHERE idtipotrabajo = ?', [idtipotrabajo], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Tipotrabajo eliminada' });
    });
};

Tipotrabajo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Tipotrabajo;
