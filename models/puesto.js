const connection = require('../config/db-connection');

const Puesto = {};

Puesto.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM puesto HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Puesto.findById = (idPuesto, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM puesto WHERE idpuesto = ? HAVING baja IS NULL OR baja = false',
    [idPuesto], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Puesto.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idpuesto) AS count FROM puesto`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Puesto.exist = (idPuesto, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM puesto WHERE idpuesto = ?) AS exist', [idPuesto], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Puesto.insert = (Puesto, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO puesto SET ?`, [Puesto], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Puesto agregada correctamente' });
    });
};

Puesto.update = (Puesto, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE puesto SET ? WHERE idpuesto = ?', [Puesto, Puesto.idpuesto], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Puesto actualizados'});
    });
};

Puesto.logicRemove = (idpuesto, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE puesto SET baja = 1 WHERE idpuesto = ?', [idpuesto], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Puesto eliminada' });
    });
};

Puesto.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Puesto;
