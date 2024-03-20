// import React from 'react'
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Articulo = () => {
    const [articulo, setArticulo] = useState([]);
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        conseguirArticulo();
    }, []);

    const conseguirArticulo = async () => {
        let { datos, cargando } = await Peticion(
            Global.url + "articulo/" + params.id
        );

        if (datos.status === "success") {
            setArticulo(datos.articulo);
        } else {
            // console.log("peticion vacia");
        }
        setCargando(cargando);
    };

    return (
        <div className="jumbo">
            {cargando ? (
                <h1>Cargando..</h1>
            ) : (
                <>
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
                    <h1>{articulo.titulo}</h1>
                    <span>{articulo.fecha}</span>
                    <p>{articulo.contenido}</p>
                </>
            )}
        </div>
    );
};
