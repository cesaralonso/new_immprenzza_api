const connection = require('../config/db-connection');

const Alerta = {};

Alerta.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM alerta HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Alerta.findById = (idAlerta, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM alerta WHERE idalerta = ? HAVING baja IS NULL OR baja = false',
    [idAlerta], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Alerta.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idalerta) AS count FROM alerta`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Alerta.exist = (idAlerta, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM alerta WHERE idalerta = ?) AS exist', [idAlerta], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Alerta.insert = (Alerta, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO alerta SET ?`, [Alerta], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Alerta agregada correctamente' });
    });
};

Alerta.update = (Alerta, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE alerta SET ? WHERE idalerta = ?', [Alerta, Alerta.idalerta], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Alerta actualizados'});
    });
};

Alerta.logicRemove = (idalerta, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE alerta SET baja = 1 WHERE idalerta = ?', [idalerta], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Alerta eliminada' });
    });
};

Alerta.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Alerta;
