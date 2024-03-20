const validator = require("validator");

const validarArticulo = (parametros) => {
    let validarTitulo =
        !validator.isEmpty(parametros.titulo) &&
        validator.isLength(parametros.titulo, { min: 5, max: 50 });
    let validarContenido = !validator.isEmpty(parametros.contenido);

    if (!validarTitulo || !validarContenido) {
        throw new Error("no se ha validado la informacion");
    }
};
module.exports = {
    validarArticulo,
};
