import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";
import { useParams } from "react-router-dom";

export const Editar = () => {
    const { formulario, cambiado } = useForm({});
    const [articulo, setArticulo] = useState([]);

    const [resultado, setResultado] = useState(false);
    const params = useParams();

    useEffect(() => {
        conseguirArticulo();
    }, []);

    const conseguirArticulo = async () => {
        let { datos } = await Peticion(Global.url + "articulo/" + params.id);

        if (datos.status === "success") {
            setArticulo(datos.articulo);
        } else {
            // console.log("peticion vacia");
        }
    };
    const editarArticulo = async (e) => {
        e.preventDefault();

        //recoger datos form
        let nuevoArticulo = formulario;
        // console.log(nuevoArticulo);

        //guardar datos en el backend
        const { datos } = await Peticion(
            Global.url + "articulo/" + params.id,
            "PUT",
            nuevoArticulo
        );

        // subir imagen
        const fileInput = document.querySelector("#file");

        if (datos.status === "success") {
            setResultado("guardado");
            if (fileInput.files[0]) {
                // console.log(fileInput);
                const formData = new FormData();
                formData.append("file0", fileInput.files[0]);

                const subida = await Peticion(
                    Global.url + "subir-imagen/" + datos.articulo._id,
                    "PUT",
                    formData,
                    true
                );
                console.log(subida.datos);
            }
        } else {
            setResultado("error");
        }
    };

    return (
        <div className="jumbo">
            <h1>Editar articulo</h1>
            <p>Formulario para editar articulo</p>
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
            <form className="formulario" onSubmit={editarArticulo}>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input
                        type="text"
                        name="titulo"
                        onChange={cambiado}
                        placeholder={articulo.titulo}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contenido">Contenido</label>
                    <textarea
                        type="text"
                        name="contenido"
                        onChange={cambiado}
                        placeholder={articulo.contenido}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file0">Imagen</label>
                    <div className="mascara">
                        {articulo.imagen === "default.png" && (
                            <img
                                src="https://png.pngtree.com/background/20230524/original/pngtree-sad-pictures-for-desktop-hd-backgrounds-picture-image_2705986.jpg"
                                alt="img articulo"
                            />
                        )}
                        {articulo.imagen !== "default.png" && (
                            <img
                                src={Global.url + "imagen/" + articulo.imagen}
                                alt="img articulo"
                            />
                        )}
                    </div>
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
