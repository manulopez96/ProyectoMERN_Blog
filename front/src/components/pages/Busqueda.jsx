import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";
import { useParams } from "react-router-dom";

export const Busqueda = () => {
    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        // console.log(params.busqueda);
        conseguirArticulos();
    }, []);

    useEffect(() => {
        conseguirArticulos();
    }, [params]);

    const conseguirArticulos = async () => {
        let { datos, cargando } = await Peticion(
            Global.url + "buscar/" + params.busqueda
        );
        // console.log(datos);

        if (datos.status === "success") {
            setArticulos(datos.articulosEncontrados);
        } else {
            console.log("peticion vacia");
            setArticulos([]);
        }
        setCargando(cargando);

        // console.log(articulos);
    };

    return (
        <>
            {cargando ? (
                <h1>Cargando..</h1>
            ) : articulos && articulos.length > 0 ? (
                <Listado
                    articulos={articulos}
                    setArticulos={setArticulos}
                ></Listado>
            ) : (
                <h1>No hay articulos</h1>
            )}
        </>
    );
};
