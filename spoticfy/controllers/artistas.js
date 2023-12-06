const Connection = require("../db");

const getArtistas = (_, res) => {

    Connection.query('SELECT * FROM `artistas`', (err, Rows) =>
    {
        if(err) console.log("no"); else console.log("hola");
        return res.status(200).json(Rows);

    });  
};

const getArtista = (req, res) => {
    const ID = req.params.id;
    Connection.query('SELECT * FROM `artistas` WHERE Id = ?', [ID], (err, Rows) =>
    {
        if(err)return res.status(404);
        return res.status(200).json(Rows);
    });
};

const createArtista = (req, res) => {

    const Name = req.body.nombre;

    Connection.query('INSERT INTO `artistas` (nombre) VALUES(?)', [Name], (err, Rows) =>
    {
        if(err) return res.status(500).json(err);
        else return res.sendStatus(200);
    });
};

const updateArtista = (req, res) => {
    
    const ArtistId = req.params.id;
    const ArtistName = req.body.nombre;

    console.log(ArtistId);
    console.log(ArtistName);
    
    Connection.query('UPDATE artistas SET nombre = ? WHERE id = ?', [ArtistName, ArtistId],
    (err, Rows) =>
    {
        if(err) {console.log(err); return res.sendStatus(404);}
        return res.sendStatus(200);
    });
};

const deleteArtista = (req, res) => {
    
    const ArtistID = req.body.id;

    Connection.query('DELETE FROM `artistas` WHERE id = ?', [ArtistID], (err, Rows) =>
    {
        if(err) { console.log(err); return res.sendStatus(404); }
        return res.sendStatus(200);
    });
};

const getAlbumesByArtista = (req, res) => {
   const ID = req.body.id;

   Connection.query('SELECT `albumes`.`nombre` FROM `albumes` WHERE `artista` = ? ', [ID],     
   (err, Rows) => 
   {
    if(err) {console.log(err); return res.sendStatus(500);}
    return res.status(200).json(Rows);
   });
};

const getCancionesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

    const ArtistID = req.body.id;

    Connection.query('SELECT canciones.id AS IDCancion, canciones.nombre, artistas.nombre AS NombreArtista, albumes.nombre, canciones.duracion, canciones.reproducciones FROM(( canciones INNER JOIN albumes ON canciones.album = albumes.id) INNER JOIN artistas ON artistas.id = albumes.artista) WHERE albumes.id = ?',
    [ArtistID], (err, Rows) => 
    {
        if(err) return res.sendStatus(500);
        return res.status(200).json(Rows);
    });
};

module.exports = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};
