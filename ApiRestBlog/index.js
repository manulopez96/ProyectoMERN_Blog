const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

// saludo inicio app
console.log("hola desde index.js");

// conectar a la db
conexion();

// servidor de node
const app = express();
const puerto = 3900;

// configurar cors
app.use(cors());

//convertir body a objeto js
app.use(express.json());  // recibir datos con content.type app/json
app.use(express.urlencoded({extended: true})); // form urlencoded


//crear rutas
const rutas_articulo = require("./rutas/articulo.ruta");
// cargo las rutas
app.use("/api", rutas_articulo);

//rutas pruebas
app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).json([
        {
            curso: "Master en react",
            autor: "Victor Robles",
            duracion: "45 hs bajo demanda",
        },
        {
            curso: "Master en react",
            autor: "Victor Robles",
            duracion: "45 hs bajo demanda",
        },
    ]);

    /*
    return res.status(200).send({
        curso: "Master en react",
        autor: "Victor Robles",
        duracion: "45 hs bajo demanda"
    });
    */
    /*
    return res.status(200).send(`
        <div>
            <h1>Probando ruta nodeJS</h1>
            <h1>Creando api rest con node</h1>
            <ul>
                <li>Master React</li>
                <li>Master Javascript</li>
            </ul>
        </div>
    `);
    */
});

app.get("/", (req, res) => {
    return res.status(200).send("<h1>Creando un api con nodeJS</h1>");
});

//crear servidor y escuchar peticiones
app.listen(puerto+2, () => {
    console.log("Servidor corriendo");
});
