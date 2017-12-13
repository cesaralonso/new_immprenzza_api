const connection = require('../config/db-connection');

const Checkout = {};

Checkout.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM checkout HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Checkout.findById = (idCheckout, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM checkout WHERE idcheckout = ? HAVING baja IS NULL OR baja = false',
    [idCheckout], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Checkout.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idcheckout) AS count FROM checkout`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Checkout.exist = (idCheckout, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM checkout WHERE idcheckout = ?) AS exist', [idCheckout], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Checkout.insert = (Checkout, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO checkout SET ?`, [Checkout], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Checkout agregada correctamente' });
    });
};

Checkout.update = (Checkout, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE checkout SET ? WHERE idcheckout = ?', [Checkout, Checkout.idcheckout], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Checkout actualizados'});
    });
};

Checkout.logicRemove = (idcheckout, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE checkout SET baja = 1 WHERE idcheckout = ?', [idcheckout], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Checkout eliminada' });
    });
};

Checkout.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Checkout;
