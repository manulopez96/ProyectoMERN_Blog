const {Schema, model} = require("mongoose");

//  Crear esquema
const ArticuloSchema = Schema({
    titulo: {
        type: String,
        // required: true,
    },
    contenido: {
        type: String,
        // required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    imagen: {
        type: String,
        default: "default.png"
    },
})

//  Creando modelos basado en el esquema
module.exports = model("Articulo", ArticuloSchema, "articulos");

