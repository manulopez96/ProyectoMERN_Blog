import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { Link } from "react-router-dom";

export const Listado = ({ articulos, setArticulos }) => {
    const eliminar = async (id) => {
        // alert(id);
        let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");
        // console.log(datos);
        if (datos.status === "success") {
            let articulosActualizados = articulos.filter(
                (articulo) => articulo._id !== id
            );
            setArticulos(articulosActualizados);
        }
    };
    return articulos.map((articulo) => {
        return (
            <article key={articulo._id} className="articulo-item">
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
                <div className="datos">
                    <h3 className="title"><Link to={"/articulo/"+articulo._id}>{articulo.titulo}</Link></h3>
                    <p className="description">{articulo.contenido}</p>
                    <Link to={"/editar/"+ articulo._id} className="edit">Editar</Link>
                    <button
                        onClick={() => {
                            eliminar(articulo._id);
                        }}
                        className="delete"
                    >
                        Eliminar
                    </button>
                </div>
            </article>
        );
    });
};
