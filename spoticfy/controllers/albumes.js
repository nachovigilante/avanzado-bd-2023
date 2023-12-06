const Connection = require("../db");
const conn = require("../db");

const getAlbumes = (_, res) => {
    Connection.query('SELECT canciones.id AS IDCancion, canciones.nombre AS NombreCancion, artistas.nombre AS NombreArtista FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON artistas.id = albumes.artista', 
    (err, Rows) => 
    {
        if(err) return res.sendStatus(500);
        return res.status(200).json(Rows);
    });
};

const getAlbum = (req, res) => {

    const AlbumID = req.body.id;

    console.log(AlbumID);
    console.log("Hola????");

    Connection.query('SELECT canciones.id AS IDCancion, canciones.nombre AS NombreCancion, artistas.nombre AS NombreArtista FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON artistas.id = albumes.artista WHERE albumes.id = ?', [AlbumID], (err, Rows)=>
    {
        if(err) {console.log(err); return res.sendStatus(404);}
        return res.status(200).json(Rows);
    });
};

const createAlbum = (req, res) => {

    const AlbumName = req.body.nombre;
    const AlbumArtist = req.body.artista;
    
    Connection.query('INSERT INTO albumes(nombre, artista) VALUES(?, ?)', [AlbumName, AlbumArtist] ,
    (err, Rows) => 
    {
        if(err) return res.sendStatus(500);
        return res.sendStatus(200);
    });
};

const updateAlbum = (req, res) => {

    const AlbumID = req.params.id;
    const AlbumName = req.body.nombre;
    const ArtistAlbumID = req.body.artista;

    Connection.query('UPDATE albumes SET nombre = ? AND artista = ? WHERE id = ?', [AlbumName, ArtistAlbumID, AlbumID],
    (err, Rows) =>
    {
        if (err) {console.log(err); return res.status(500);}
        return res.sendStatus(200); 
    });
};

const deleteAlbum = (req, res) => {
    const AlbumID = req.params.id;

    Connection.query('DELETE FROM albumes WHERE albumes.id = ?', [AlbumID], 
    (err, Rows) =>
    {
        if (err) { console.log(err); return res.sendStatus(404);}
        return res.sendStatus(200);
    });

};

const getCancionesByAlbum = (req, res) => {
    const AlbumID = req.params.id;

    Connection.query('SELECT canciones.*, artistas.nombre FROM canciones INNER JOIN albumes ON albumes.id = canciones.album INNER JOIN artistas ON artistas.id = albumes.artista WHERE canciones.id = ?' ,
    [AlbumID], (err, rows) =>
    {
        if(err) {console.log(err); return res.sendStatus(404);}
        return res.status(200).json(rows);
    });
};

module.exports = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};
