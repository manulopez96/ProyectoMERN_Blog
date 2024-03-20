const fs = require("fs");
const path = require("path");
const Articulo = require("../modelos/Articulo");
const { validarArticulo } = require("../helper/validar");

/*
const controlador = {
    propiedad: () => {
    }
}
module.export = controlador;
*/

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "soy una accion de pruebas en mi controlador de articulos",
    });
};

const curso = (req, res) => {
    // console.log("Se ha ejecutado el endpoint probando");

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
};

const crear = (req, res) => {
    // recoger los parametros post a guardar
    let parametros = req.body;

    // validar los datos
    try {
        validarArticulo(parametros);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por validar",
        });
    }

    // crear el objeto a guardar
    const articulo = new Articulo(parametros); // automatico

    // Asignar valores al objeto basado en  el modelo, manual o automatico
    // articulo.titulo = parametros.titulo; // manual

    // guardar articulo en la db
    articulo
        .save()
        .then((articuloGuardado) => {
            return res.status(200).json({
                status: "success",
                message: "Articulo guardado con exito",
                articulo: articuloGuardado,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: "error",
                message: "Error al guardar el artículo",
            });
        });
    /*
    // ya no permite el metodo save funciones callback
    articulo.save((error, articuloGuardado) => {
        if (error || !articuloGuardado) {
            return res.status(400).json({
                status: "Error",
                mensaje: "No se ha guardado el articulo",
            });
        }
    });
*/
};

/*
const listar = (req, res) => {
    let consulta = Articulo.find({});
    return res.status(200).send({
        status: "success",
        consulta
    });
    /*
    let consulta = Articulo.find({}).exec((error, articulos) => {
        if (error || !articulos) {
            return res.status(404).json({
                status: "Error",
                mensaje: "No se han encontrado articulos",
            });
        }
        return res.status(200).send({
            status: "success",
            articulos
        })
    });
};
*/
const listar = (req, res) => {
    let consulta = Articulo.find({});

    if (req.params.ultimos) {
        consulta.limit(req.params.ultimos);
    }

    consulta
        .sort({ fecha: -1 })
        .then((articulos) => {
            return res.status(200).send({
                status: "success",
                parametroURL: req.params.ultimos,
                contador: articulos.length,
                articulos,
            });
        })
        .catch((err) => {
            return res.status(500).send({
                status: "error",
                message: "Error al obtener los artículos",
            });
        });
};

const uno = (req, res) => {
    //  recoger el id por la url
    let id = req.params.id;

    //  buscar el articulo
    Articulo.findById(id)
        .then((articulo) => {
            //  si existe devolver resultado
            return res.status(200).send({
                status: "success",
                id,
                articulo,
            });
        })
        .catch((err) => {
            //  si no existe devolver error
            return res.status(404).send({
                status: "error",
                message: "no se ha encontrado el articulo",
            });
        });
};

const borrar = (req, res) => {
    let id_a_borrar = req.params.id;

    Articulo.findOneAndDelete({ _id: id_a_borrar })
        .then((articulo) => {
            if (!articulo) {
                return res.status(400).json({
                    status: "Finish",
                    messaje: "Articulo no existente",
                });
            }
            return res.status(200).json({
                status: "success",
                messaje: "Articulo borrado",
                articulo,
            });
        })
        .catch((err) => {
            return res.status(404).json({
                status: "error",
                message: "Error al borrar",
            });
        });
};

const editar = (req, res) => {
    // recoger id articulo a editar
    let idEditar = req.params.id;

    // recoger datos del body
    let parametros = req.body;

    // validar datos
    try {
        validarArticulo(parametros);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por validar",
        });
    }

    // Buscar y actualizar parametro
    Articulo.findOneAndUpdate({ _id: idEditar }, req.body)
        .then((articulo) => {
            if (!articulo) {
                return res.status(400).json({
                    status: "Error",
                    messaje: "Articulo no existente",
                });
            }
            return res.status(200).json({
                status: "success",
                messaje: "Articulo actualizado",
                articulo,
            });
        })
        .catch((err) => {
            return res.status(404).json({
                status: "error",
                message: "Error al editar el articulo",
            });
        });

    // devolver respuesta
};

const subir = (req, res) => {
    //configurar multer

    //recoger el fichero de imagen subido
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "no way man",
            messaje: "peticion invalida",
        });
    } else {
        //nombre del archivo
        let nombreArchivo = req.file.originalname;

        //Extencion del archivo
        let nombreArchivo_split = nombreArchivo.split(".");
        let extension = nombreArchivo_split[1];

        //Comprobar la extencion correcta
        if (
            extension != "png" &&
            extension != "jpg" &&
            extension != "jpeg" &&
            extension != "gif"
        ) {
            // borrar archivo
            fs.unlink(req.file.path, (error) => {
                return res.status(400).json({
                    status: "error",
                    messaje: "imagen invalida",
                });
            });
        } else {
            // recoger id articulo a editar
            let idEditar = req.params.id;

            // Buscar y actualizar parametro
            Articulo.findOneAndUpdate(
                { _id: idEditar },
                { imagen: req.file.filename }
            )
                .then((articulo) => {
                    if (!articulo) {
                        return res.status(400).json({
                            status: "Error",
                            messaje: "Articulo no existente",
                        });
                    }
                    // devolver respuesta
                    return res.status(200).json({
                        status: "success",
                        messaje: "Articulo actualizado",
                        extension,
                        articulo,
                        file: req.file,
                    });
                })
                .catch((err) => {
                    return res.status(404).json({
                        status: "error",
                        message: "Error al editar el articulo",
                    });
                });
        }
    }
};

const imagen = (req, res) => {
    // recibir fichero
    let fichero = req.params.fichero;
    let rutaFisica = "./imagenes/articulos/" + fichero;

    fs.stat(rutaFisica, (error, existe) => {
        if (existe) {
            return res.sendFile(path.resolve(rutaFisica));
            // console.log(res.sendFile(path));
        } else {
            return res.status(404).json({
                status: "error",
                message: "La imagen no existe",
            });
        }
    });
};

const buscar = (req, res) => {
    // sacar sring de busqueda
    let busqueda = req.params.busqueda;

    // find db OR
    Articulo.find({
        $or: [
            { titulo: { $regex: busqueda, $options: "i" } },
            { contenido: { $regex: busqueda, $options: "i" } },
        ],
    })

        // Orden
        .sort({ fecha: -1 })
        .then((articulosEncontrados) => {
            // Devolver resultado
            if(articulosEncontrados.length < 1){
                return res.status(200).json({
                    status: "success",
                    messaje: "No hay coincidencias",
                });
            }
            return res.status(200).json({
                status: "success",
                articulosEncontrados,
            });
        })
        .catch((error) => {
            return res.status(400).json({
                status: "error",
                messaje: "articulo no encontrado",
                error,
            });
        });

    // ejecutar consulta
};

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscar,
};

/*
// function nombre_metodo () {
const nombre_metodo = () => {

}

module.export = {

}
*/
