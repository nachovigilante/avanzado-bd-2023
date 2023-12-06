const Connection = require("../db");
const conn = require("../db");

const getCanciones = (_, res) => {
    Connection.query('SELECT canciones.*, artistas.nombre FROM canciones INNER JOIN albumes ON albumes.id = canciones.album INNER JOIN artistas ON artistas.id = albumes.artista', 
    (err, Rows) =>
    {
        if(err) {console.log(err); return res.sendStatus(500);}
        return res.status(200).json(Rows);
    });
};

const getCancion = (req, res) => {

    const SongID = req.params.id;

    Connection.query('SELECT canciones.*, artistas.nombre FROM canciones INNER JOIN albumes ON albumes.id = canciones.album INNER JOIN artistas ON artistas.id = albumes.artist WHERE canciones.id = ?', [SongID],
    (err, Rows) => 
    {
        if(err) {console.log(err); return res.sendStatus(404);}
        return res.status(200).json(Rows);
    });
};

const createCancion = (req, res) => {
    const SongName = req.body.nombre;
    const SongAlbum = req.body.album;
    const SongDuration = req.body.duracion;

    Connection.query('INSERT INTO canciones(nombre, album, duracion, reproducciones) VALUES(?,?,?,0)', [SongName, SongAlbum, SongDuration], 
    (err, Rows) =>
    {
        if(err) {console.log(err); return res.sendStatus(500);}
        return res.sendStatus(200);
    })

};

const updateCancion = (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)

        const SongID = req.params.id;
        const SongName = req.body.nombre;
        const SongAlbum = req.body.album;
        const SongDuration = req.body.duracion;

    Connection.query('UPDATE canciones SET nombre = ? AND album = ? AND duracion = ? WHERE id = ?', [SongName, SongAlbum, SongDuration, SongID],
    (err, Rows) =>
    {
        if(err) {console.log(err); return res.sendStatus(404);}
        return res.sendStatus(200);
    });


};

const deleteCancion = (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const SongID = req.params.id;

    Connection.query('DELETE FROM canciones WHERE canciones.id = ?', [SongID], (err, Rows)=>
    {
        if(err) {console.log(err); return res.sendStatus(404);}
        return res.sendStatus(200);
    });
};

const reproducirCancion = (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params

    const SongID = req.params.id;

    Connection.query('UPDATE canciones SET canciones.id = canciones.id + 1 WHERE canciones.id = ?', [SongID], (err, Rows) =>
    {
        if(err){console.log(err); return res.sendStatus(404);}
        return res.sendStatus(200);
    });
};

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};
