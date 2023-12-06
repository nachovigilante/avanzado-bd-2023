const conn = require("../db");
const axios = require("axios");
const clc = require("cli-color");
const { Table } = require("console-table-printer");

/* IMPORTANTE: Para correr los tests hace falta correr

    npm install axios cli-color console-table-printer

    luego modificar su archivo package.json por el del repo actual

    y luego correr

    npm run test

*/

const OK_MSG = clc.white.bgGreen(" OK ");
const ERROR_MSG = clc.white.bgRed(" ERROR ");

var resultsTable = new Table({
    columns: [
        { name: "Test", alignment: "left" },
        { name: "Resultado", alignment: "center" },
    ],
});

const getCurrentData = (table) => {
    return new Promise((resolve, reject) => {
        switch (table) {
            case "artistas":
                // NO USAR ESTAS QUERIES, NO SON CORRECTAS, SON SOLO PARA TESTEAR
                conn.query("SELECT * FROM artistas", (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
                break;
            case "albumes":
                // NO USAR ESTAS QUERIES, NO SON CORRECTAS, SON SOLO PARA TESTEAR
                conn.query(
                    `SELECT albumes.*, artistas.nombre AS nombre_artista
                        FROM albumes
                        LEFT JOIN artistas 
                            ON albumes.artista = artistas.id`,
                    (err, rows) => {
                        if (err) return reject(err);
                        resolve(rows);
                    }
                );
                break;
            case "canciones":
                // NO USAR ESTAS QUERIES, NO SON CORRECTAS, SON SOLO PARA TESTEAR
                conn.query(
                    `SELECT canciones.*, albumes.nombre AS nombre_album, artistas.nombre AS nombre_artista 
                        FROM canciones
                        LEFT JOIN albumes 
                            ON canciones.album = albumes.id 
                        LEFT JOIN artistas 
                            ON albumes.artista = artistas.id`,
                    (err, rows) => {
                        if (err) return reject(err);
                        resolve(rows);
                    }
                );
                break;
            default:
                break;
        }
    });
};

const testGet = async (table) => {
    const currentData = await getCurrentData(table);
    let APIData;

    try {
        APIData = await axios.get(`http://localhost:3000/${table}`);
    } catch (error) {
        resultsTable.addRow(
            { Test: `GET /${table}`, Resultado: ERROR_MSG },
            { color: "red" }
        );
        console.log("Test GET /" + table + ": ");
        console.log("Error: " + error);
        return false;
    }

    if (table === "albumes") currentData.map((a) => delete a.artista);

    if (table === "canciones") currentData.map((a) => delete a.album);

    if (
        JSON.stringify(currentData, Object.keys(currentData).sort()) !==
        JSON.stringify(APIData.data, Object.keys(APIData.data).sort())
    ) {
        console.log("Test GET /" + table + ": ");
        console.log("Esperado:");
        console.table(currentData);
        console.log("Recibido:");
        console.table(APIData.data);
    }

    resultsTable.addRow(
        {
            Test: `GET /${table}`,
            Resultado:
                JSON.stringify(currentData, Object.keys(currentData).sort()) ===
                JSON.stringify(APIData.data, Object.keys(APIData.data).sort())
                    ? OK_MSG
                    : ERROR_MSG,
        },
        {
            color:
                JSON.stringify(currentData, Object.keys(currentData).sort()) ===
                JSON.stringify(APIData.data, Object.keys(APIData.data).sort())
                    ? "green"
                    : "red",
        }
    );

    return (
        JSON.stringify(currentData, Object.keys(currentData).sort()) ===
        JSON.stringify(APIData.data, Object.keys(APIData.data).sort())
    );
};

const testPost = async (table, data) => {
    try {
        await axios.post(`http://localhost:3000/${table}`, data);
    } catch (error) {
        resultsTable.addRow(
            { Test: `POST /${table}`, Resultado: ERROR_MSG },
            { color: "red" }
        );
        console.log("Test POST /" + table + ": ");
        console.log("Error: " + error);
        return false;
    }

    const currentData = await getCurrentData(table);
    const lastRegister = currentData[currentData.length - 1];
    delete lastRegister.id;

    if (table === "albumes") {
        const artistas = await getCurrentData("artistas");
        data.nombre_artista = artistas.find(
            (a) => a.id === data.artista
        ).nombre;
    }

    if (table === "canciones") {
        const albumes = await getCurrentData("albumes");
        data.reproducciones = 0;
        data.nombre_album = albumes.find((a) => a.id === data.album).nombre;
        const artistas = await getCurrentData("artistas");
        data.nombre_artista = artistas.find(
            (a) => a.id === albumes.find((a) => a.id === data.album).artista
        ).nombre;
    }

    resultsTable.addRow(
        {
            Test: `POST /${table}`,
            Resultado:
                JSON.stringify(
                    lastRegister,
                    Object.keys(lastRegister).sort()
                ) === JSON.stringify(data, Object.keys(data).sort())
                    ? OK_MSG
                    : ERROR_MSG,
        },
        {
            color:
                JSON.stringify(
                    lastRegister,
                    Object.keys(lastRegister).sort()
                ) === JSON.stringify(data, Object.keys(data).sort())
                    ? "green"
                    : "red",
        }
    );

    return (
        JSON.stringify(lastRegister, Object.keys(lastRegister).sort()) ===
        JSON.stringify(data, Object.keys(data).sort())
    );
};

const testPut = async (table, data) => {
    const currentData = await getCurrentData(table);
    const lastRegister = currentData[currentData.length - 1];

    try {
        await axios.put(
            `http://localhost:3000/${table}/${lastRegister.id}`,
            data
        );
    } catch (error) {
        resultsTable.addRow(
            { Test: `PUT /${table}`, Resultado: ERROR_MSG },
            { color: "red" }
        );
        console.log("Test PUT /" + table + ": ");
        console.log("Error: " + error);
        return false;
    }

    const updatedData = await getCurrentData(table);
    const updatedRegister = updatedData.find((r) => r.id === lastRegister.id);

    delete updatedRegister.id;

    if (table === "albumes") {
        const artistas = await getCurrentData("artistas");
        data.nombre_artista = artistas.find(
            (a) => a.id === data.artista
        ).nombre;
    }

    if (table === "canciones") {
        const albumes = await getCurrentData("albumes");
        data.reproducciones = 0;
        data.nombre_album = albumes.find((a) => a.id === data.album).nombre;
        const artistas = await getCurrentData("artistas");
        data.nombre_artista = artistas.find(
            (a) => a.id === albumes.find((a) => a.id === data.album).artista
        ).nombre;
    }

    resultsTable.addRow(
        {
            Test: `PUT /${table}`,
            Resultado:
                JSON.stringify(
                    updatedRegister,
                    Object.keys(updatedRegister).sort()
                ) === JSON.stringify(data, Object.keys(data).sort())
                    ? OK_MSG
                    : ERROR_MSG,
        },
        {
            color:
                JSON.stringify(
                    updatedRegister,
                    Object.keys(updatedRegister).sort()
                ) === JSON.stringify(data, Object.keys(data).sort())
                    ? "green"
                    : "red",
        }
    );

    return (
        JSON.stringify(updatedRegister, Object.keys(updatedRegister).sort()) ===
        JSON.stringify(data, Object.keys(data).sort())
    );
};

const testDelete = async (table) => {
    const currentData = await getCurrentData(table);
    const lastRegister = currentData[currentData.length - 1];

    try {
        await axios.delete(`http://localhost:3000/${table}/${lastRegister.id}`);
    } catch (error) {
        resultsTable.addRow(
            { Test: `DELETE /${table}`, Resultado: ERROR_MSG },
            { color: "red" }
        );
        console.log("Test DELETE /" + table + ": ");
        console.log("Error: " + error);
        return false;
    }

    const updatedData = await getCurrentData(table);
    const updatedRegister = updatedData.find((r) => r.id === lastRegister.id);

    resultsTable.addRow(
        {
            Test: `DELETE /${table}`,
            Resultado: updatedRegister ? ERROR_MSG : OK_MSG,
        },
        {
            color: updatedRegister ? "red" : "green",
        }
    );

    return !updatedRegister;
};

const testGetById = async (table) => {
    const currentData = await getCurrentData(table);
    const lastRegister = currentData[currentData.length - 1];

    let APIData;

    try {
        APIData = await axios.get(
            `http://localhost:3000/${table}/${lastRegister.id}`
        );
    } catch (error) {
        resultsTable.addRow(
            {
                Test: `GET /${table}/:id`,
                Resultado: ERROR_MSG,
            },
            {
                color: "red",
            }
        );
        console.log("Test GET /" + table + "/:id :");
        console.log("Error: " + error);
        return false;
    }

    if (table === "albumes") delete lastRegister.artista;

    if (table === "canciones") delete lastRegister.album;

    if (
        JSON.stringify(lastRegister, Object.keys(lastRegister).sort()) !==
        JSON.stringify(APIData.data, Object.keys(APIData.data).sort())
    ) {
        console.log("Test GET /" + table + "/:id :");
        console.log("Esperado:");
        console.log(
            JSON.stringify(lastRegister, Object.keys(lastRegister).sort())
        );
        console.log("Recibido:");
        console.log(
            JSON.stringify(APIData.data, Object.keys(APIData.data).sort())
        );
    }

    resultsTable.addRow(
        {
            Test: `GET /${table}/:id`,
            Resultado:
                JSON.stringify(
                    lastRegister,
                    Object.keys(lastRegister).sort()
                ) ===
                JSON.stringify(APIData.data, Object.keys(APIData.data).sort())
                    ? OK_MSG
                    : ERROR_MSG,
        },
        {
            color:
                JSON.stringify(
                    lastRegister,
                    Object.keys(lastRegister).sort()
                ) ===
                JSON.stringify(APIData.data, Object.keys(APIData.data).sort())
                    ? "green"
                    : "red",
        }
    );

    return (
        JSON.stringify(lastRegister, Object.keys(lastRegister).sort()) ===
        JSON.stringify(lastRegister, Object.keys(APIData.data).sort())
    );
};

const testGetAlbumesByArtista = async () => {
    const currentData = await getCurrentData("albumes");
    const lastRegister = currentData[currentData.length - 1];

    let APIData;

    try {
        APIData = await axios.get(
            `http://localhost:3000/artistas/${lastRegister.artista}/albumes`
        );
    } catch (error) {
        resultsTable.addRow(
            {
                Test: `GET /artistas/:id/albumes`,
                Resultado: ERROR_MSG,
            },
            {
                color: "red",
            }
        );
        return false;
    }

    const filteredData = currentData.filter(
        (a) => a.artista === lastRegister.artista
    );

    resultsTable.addRow(
        {
            Test: `GET /artistas/:id/albumes`,
            Resultado:
                JSON.stringify(
                    lastRegister,
                    Object.keys(filteredData).sort()
                ) ===
                JSON.stringify(lastRegister, Object.keys(APIData.data).sort())
                    ? OK_MSG
                    : ERROR_MSG,
        },
        {
            color:
                JSON.stringify(
                    lastRegister,
                    Object.keys(filteredData).sort()
                ) ===
                JSON.stringify(lastRegister, Object.keys(APIData.data).sort())
                    ? "green"
                    : "red",
        }
    );

    return (
        JSON.stringify(lastRegister, Object.keys(filteredData).sort()) ===
        JSON.stringify(lastRegister, Object.keys(APIData.data).sort())
    );
};

const testGetCancionesByAlbum = async () => {
    const currentData = await getCurrentData("canciones");
    const lastRegister = currentData[currentData.length - 1];

    let APIData;

    try {
        APIData = await axios.get(
            `http://localhost:3000/albumes/${lastRegister.album}/canciones`
        );
    } catch (error) {
        resultsTable.addRow(
            {
                Test: `GET /albumes/:id/canciones`,
                Resultado: ERROR_MSG,
            },
            {
                color: "red",
            }
        );
        return false;
    }

    const filteredData = currentData.filter(
        (a) => a.album === lastRegister.album
    );

    resultsTable.addRow(
        {
            Test: `GET /albumes/:id/canciones`,
            Resultado:
                JSON.stringify(
                    lastRegister,
                    Object.keys(filteredData).sort()
                ) ===
                JSON.stringify(lastRegister, Object.keys(APIData.data).sort())
                    ? OK_MSG
                    : ERROR_MSG,
        },
        {
            color:
                JSON.stringify(
                    lastRegister,
                    Object.keys(filteredData).sort()
                ) ===
                JSON.stringify(lastRegister, Object.keys(APIData.data).sort())
                    ? "green"
                    : "red",
        }
    );

    return (
        JSON.stringify(lastRegister, Object.keys(filteredData).sort()) ===
        JSON.stringify(lastRegister, Object.keys(APIData.data).sort())
    );
};

const testGetCancionesByArtista = async () => {
    const currentData = await getCurrentData("canciones");
    const lastRegister = currentData[currentData.length - 1];
    const albumes = await getCurrentData("albumes");
    const artista = albumes.find((a) => a.id === lastRegister.album).artista;

    let APIData;

    try {
        APIData = await axios.get(
            `http://localhost:3000/artistas/${artista}/canciones`
        );
    } catch (error) {
        resultsTable.addRow(
            {
                Test: `GET /artistas/:id/canciones`,
                Resultado: ERROR_MSG,
            },
            {
                color: "red",
            }
        );
        return false;
    }

    const filteredData = currentData.filter(
        (a) => albumes.find((b) => b.id === a.album).artista === artista
    );

    resultsTable.addRow(
        {
            Test: `GET artistas/:id/canciones/`,
            Resultado:
                JSON.stringify(
                    lastRegister,
                    Object.keys(filteredData).sort()
                ) ===
                JSON.stringify(lastRegister, Object.keys(APIData.data).sort())
                    ? OK_MSG
                    : ERROR_MSG,
        },
        {
            color:
                JSON.stringify(
                    lastRegister,
                    Object.keys(filteredData).sort()
                ) ===
                JSON.stringify(lastRegister, Object.keys(APIData.data).sort())
                    ? "green"
                    : "red",
        }
    );

    return (
        JSON.stringify(lastRegister, Object.keys(filteredData).sort()) ===
        JSON.stringify(lastRegister, Object.keys(APIData.data).sort())
    );
};

const testReproducirCancion = async () => {
    const currentData = await getCurrentData("canciones");
    const lastRegister = currentData[currentData.length - 1];

    try {
        await axios.put(
            `http://localhost:3000/canciones/${lastRegister.id}/reproducir`
        );
    } catch (error) {
        resultsTable.addRow(
            {
                Test: `PUT /canciones/:id/reproducir`,
                Resultado: ERROR_MSG,
            },
            {
                color: "red",
            }
        );
        console.log("PUT /canciones/:id/reproducir");
        console.log("Error: " + error);
        return false;
    }

    const updatedData = await getCurrentData("canciones");
    const updatedRegister = updatedData.find((r) => r.id === lastRegister.id);

    resultsTable.addRow(
        {
            Test: `PUT /canciones/:id/reproducir`,
            Resultado:
                updatedRegister.reproducciones ===
                lastRegister.reproducciones + 1
                    ? OK_MSG
                    : ERROR_MSG,
        },
        {
            color:
                updatedRegister.reproducciones ===
                lastRegister.reproducciones + 1
                    ? "green"
                    : "red",
        }
    );

    return updatedRegister.reproducciones === lastRegister.reproducciones + 1;
};

const runTests = async () => {
    const gets = [];

    gets.push(await testGet("artistas"));
    gets.push(await testGet("albumes"));
    gets.push(await testGet("canciones"));

    gets.push(await testGetById("artistas"));
    gets.push(await testGetById("albumes"));
    gets.push(await testGetById("canciones"));

    const specialGets = [];

    specialGets.push(await testGetAlbumesByArtista());
    specialGets.push(await testGetCancionesByAlbum());
    specialGets.push(await testGetCancionesByArtista());

    const posts = [];

    posts.push(
        await testPost("artistas", {
            nombre: "Test",
        })
    );

    posts.push(
        await testPost("albumes", {
            nombre: "Test",
            artista: 1,
        })
    );

    posts.push(
        await testPost("canciones", {
            nombre: "Test",
            album: 1,
            duracion: 100,
        })
    );

    posts.push(
        await testPut("artistas", {
            nombre: "Test 2",
        })
    );

    posts.push(
        await testPut("albumes", {
            nombre: "Test 2",
            artista: 1,
        })
    );

    posts.push(
        await testPut("canciones", {
            nombre: "Test 2",
            album: 1,
            duracion: 100,
        })
    );

    posts.push(await testReproducirCancion());

    const deletes = [];

    deletes.push(await testDelete("artistas"));
    deletes.push(await testDelete("albumes"));
    deletes.push(await testDelete("canciones"));

    resultsTable.printTable();

    const ratesTable = new Table({
        columns: [
            { name: "Tipo de request", alignment: "left" },
            { name: "Acertados", alignment: "center" },
        ],
    });

    ratesTable.addRow(
        {
            "Tipo de request": "GET",
            Acertados: `${gets.filter((a) => a).length}/${gets.length}`,
        },
        {
            color:
                gets.filter((a) => a).length / gets.length > 0.75
                    ? "green"
                    : gets.filter((a) => a).length / gets.length > 0.25
                    ? "yellow"
                    : "red",
        }
    );

    ratesTable.addRow(
        {
            "Tipo de request": "GET (especiales)",
            Acertados: `${specialGets.filter((a) => a).length}/${
                specialGets.length
            }`,
        },
        {
            color:
                specialGets.filter((a) => a).length / specialGets.length > 0.75
                    ? "green"
                    : specialGets.filter((a) => a).length / specialGets.length >
                      0.25
                    ? "yellow"
                    : "red",
        }
    );

    ratesTable.addRow(
        {
            "Tipo de request": "POST/PUT",
            Acertados: `${posts.filter((a) => a).length}/${posts.length}`,
        },
        {
            color:
                posts.filter((a) => a).length / posts.length > 0.75
                    ? "green"
                    : posts.filter((a) => a).length / posts.length > 0.25
                    ? "yellow"
                    : "red",
        }
    );

    ratesTable.addRow(
        {
            "Tipo de request": "DELETE",
            Acertados: `${deletes.filter((a) => a).length}/${deletes.length}`,
        },
        {
            color:
                deletes.filter((a) => a).length / deletes.length > 0.75
                    ? "green"
                    : deletes.filter((a) => a).length / deletes.length > 0.25
                    ? "yellow"
                    : "red",
        }
    );

    ratesTable.printTable();
};

runTests();
