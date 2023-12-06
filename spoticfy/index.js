const express = require("express");
const App = express();
const port = 3000;

const Artistas = require("./controllers/Artistas");
const Albumes = require("./controllers/Albumes");
const Canciones = require("./controllers/Canciones");
const DB = require("./db.js");

App.use(express.json());

App.get("/", (_, res) => {
    res.send("SpoTICfy API working!");
});

/* ------------------- Rutas ------------------- */

// Artistas
// Completar con las rutas de Artistas
// Para acceder a cada funcion de Artistas, se debe hacer de la siguiente forma:
// Artistas.getArtistas;
// Artistas.getArtista;
// ...

App.get("/artistas", Artistas.getArtistas);

App.get("/artistas/:id", Artistas.getArtista);

App.post("/artistas", Artistas.createArtista);

App.put("/artistas/:id", Artistas.updateArtista);

App.delete("/artistas/:id", Artistas.deleteArtista);

App.get("/artistas/:id/albumes", Artistas.getAlbumesByArtista);

App.get("/artistas/:id/canciones", Artistas.getCancionesByArtista);



// Albumes
// Completar con las rutas de Albumes
// Para acceder a cada funcion de Albumes, se debe hacer de la siguiente forma:
// Albumes.getAlbumes;
// Albumes.getAlbum;
// ...

App.get("/albumes", Albumes.getAlbumes);

App.get("/albumes/:id", Albumes.getAlbum);

App.post("/albumes", Albumes.createAlbum);

App.put("/albumes/:id", Albumes.updateAlbum);

App.delete("/albumes/:id", Albumes.deleteAlbum);

App.get("/albumes/:id/canciones", Albumes.getCancionesByAlbum);


// Canciones
// Completar con las rutas de Canciones
// Para acceder a cada funcion de Canciones, se debe hacer de la siguiente forma:
// Canciones.getCanciones;
// Canciones.getCancion;
// ...

App.get("/canciones", Canciones.getCanciones);

App.get("/canciones/:id", Canciones.getCancion);

App.post("/canciones", Canciones.createCancion);

App.put("/canciones/:id", Canciones.updateCancion);

App.delete("/canciones/:id", Canciones.deleteCancion);

App.put("/canciones/:id/reproducir", Canciones.reproducirCancion);

App.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});
