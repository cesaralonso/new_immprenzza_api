const connection = require('../config/db-connection');

const Cliente = {};

Cliente.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM cliente HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Cliente.findById = (idCliente, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM cliente WHERE idcliente = ? HAVING baja IS NULL OR baja = false',
    [idCliente], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Cliente.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idcliente) AS count FROM cliente`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Cliente.exist = (idCliente, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM cliente WHERE idcliente = ?) AS exist', [idCliente], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Cliente.insert = (Cliente, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO cliente SET ?`, [Cliente], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Cliente agregada correctamente' });
    });
};

Cliente.update = (Cliente, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE cliente SET ? WHERE idcliente = ?', [Cliente, Cliente.idcliente], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Cliente actualizados'});
    });
};

Cliente.logicRemove = (idcliente, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE cliente SET baja = 1 WHERE idcliente = ?', [idcliente], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Cliente eliminada' });
    });
};

Cliente.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Cliente;
