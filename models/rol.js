const connection = require('../config/db-connection');

const Rol = {};

Rol.all = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM rol HAVING baja IS NULL OR baja = false', (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result });
    });
};

Rol.findById = (idRol, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT * FROM rol WHERE idrol = ? HAVING baja IS NULL OR baja = false',
    [idRol], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Rol.count = next => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`SELECT COUNT(idrol) AS count FROM rol`, (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });
    });
};

Rol.exist = (idRol, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('SELECT EXISTS(SELECT 1 FROM rol WHERE idrol = ?) AS exist', [idRol], (error, result) => {
        if ( error )
            return next({ success: false, error: error })
        else
            return next( null, { success: true, result: result[0] });

    })
};

Rol.insert = (Rol, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query(`INSERT INTO rol SET ?`, [Rol], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo' })
        else
            return next( null, { success: true, result: result, message: 'Rol agregada correctamente' });
    });
};

Rol.update = (Rol, next) => {
    if ( !connection )
        return next('Connection refused');
    connection.query('UPDATE rol SET ? WHERE idrol = ?', [Rol, Rol.idrol], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al realizar esta acción, intente de nuevo'});
        else
            return next( null, { success: true, result: result, message: 'Datos de la Rol actualizados'});
    });
};

Rol.logicRemove = (idrol, next) => {
    if( !connection )
        return next('Connection refused');
    connection.query('UPDATE rol SET baja = 1 WHERE idrol = ?', [idrol], (error, result) => {
        if ( error )
            return next({ success: false, error: error, message: 'Hubo un error al eliminar este registro' });
        else
            return next( null, { success: true, result: result, message: 'Rol eliminada' });
    });
};

Rol.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Rol;
