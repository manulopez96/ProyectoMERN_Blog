// require para importar
const { connect } = require("mongoose");

const conexion = async () => {
    try {
        await connect("mongodb://localhost:27017/mi_blog");
        //parametros si hay aviso o fallo, en la ultima version no son obligatorios
        //useNewUrlParser: true
        //useUnifiedTopoLogy: true
        //useCreatIndex: true
        console.log("Conectados correctamente a la db mi_blog");
    } catch (error) {
        console.log(error);
        throw new Error("No se a podido conectar a la db");
    }
};

// module export para exportar
module.exports = {
    conexion,
};
