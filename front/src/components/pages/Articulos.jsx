import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";

export const Articulos = () => {
    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        conseguirArticulos();
    }, []);

    const conseguirArticulos = async () => {
        let { datos, cargando } = await Peticion(Global.url + "articulos");

        if (datos.status === "success") {
            setArticulos(datos.articulos);
        } else {
            // console.log("peticion vacia");
        }
        setCargando(cargando);
    };

    return (
        <>
            {cargando ? (
                <h1>Cargando..</h1>
            ) : articulos.length > 0 ? (
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
