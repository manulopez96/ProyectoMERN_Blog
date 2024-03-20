const express = require("express");
const router = express.Router();
const ArticuloControlador = require("../controladores/articulo.controlador");
const multer = require("multer");

const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./imagenes/articulos");
    },
    filename: function (req, file, cb) {
        cb(null, "articulo" + Date.now() + file.originalname);
    },
});

const subidas = multer({ storage: storageConfig });

// ruta de prueba
router.get("/prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);

// ruta util
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos/:ultimos?", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.uno);
router.delete("/articulo/:id", ArticuloControlador.borrar);
router.put("/articulo/:id", ArticuloControlador.editar);
router.post(
    "/subir-imagen/:id",
    [subidas.single("file0")],
    ArticuloControlador.subir
);
router.get("/imagen/:fichero", ArticuloControlador.imagen);
router.get("/buscar/:busqueda", ArticuloControlador.buscar);

module.exports = router;
