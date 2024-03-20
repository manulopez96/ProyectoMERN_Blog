import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";

export const Crear = () => {
    const { formulario, enviado, cambiado } = useForm({});
    const [resultado, setResultado] = useState(false);

    const guardarArticulo = async (e) => {
        e.preventDefault();

        //recoger datos form
        let nuevoArticulo = formulario;
        // console.log(nuevoArticulo);

        //guardar datos en el backend
        const { datos, } = await Peticion(
            Global.url + "crear",
            "POST",
            nuevoArticulo
            );

            // subir imagen
            const fileInput = document.querySelector("#file");

        if (datos.status === "success" && fileInput.files[0]) {
            setResultado("guardado");

            // console.log(fileInput);
            const formData = new FormData();
            formData.append("file0", fileInput.files[0]);

            const subida = await Peticion(
                Global.url+"subir-imagen/"+datos.articulo._id,
                "POST",
                formData,
                true
            );
            console.log(subida.datos);
        } else {
            setResultado("error");
        }
    };

    return (
        <div className="jumbo">
            <h1>Crear articulo</h1>
            <p>Formulario para crear articulo</p>
            <strong>
                {resultado === "guardado" ? "articulo guardado con exito!" : ""}
            </strong>
            <strong>
                {resultado === "error"
                    ? "Valores proporcionados no validos"
                    : ""}
            </strong>
            <br />
            <br />
            {/* montar formulario */}
            <form className="formulario" onSubmit={guardarArticulo}>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input type="text" name="titulo" onChange={cambiado} />
                </div>
                <div className="form-group">
                    <label htmlFor="contenido">Contenido</label>
                    <textarea
                        type="text"
                        name="contenido"
                        onChange={cambiado}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file0">Imagen</label>
                    <input type="file" name="file0" id="file" />
                </div>
                <input
                    type="submit"
                    value="Guardar"
                    className="btn btn-success"
                />
            </form>
        </div>
    );
};