// import React from 'react'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    // const [buscar, setBuscar] = useState("");
    const navegar = useNavigate();

    const hacerBusqueda = (e) => {
        e.preventDefault();

        // console.log(e.target.search_field.value);
        let mi_busqueda = e.target.search_field.value;
        navegar("/buscar/" + mi_busqueda, { replace: true });
    };
    return (
        <div className="lateral">
            <div className="search">
                <h3 className="title">Buscador</h3>
                <form action="" onSubmit={hacerBusqueda}>
                    <input type="text" id="search_field"></input>
                    <input type="submit" value="Buscar" id="search"></input>
                </form>
            </div>

            {/* <div className="add">
                <h3 className="title">Añadir Pelicula</h3>
                <form action="">
                    <input type="text" placeholder="Titulo"></input>
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="Descripcion"
                    ></textarea>
                    <input type="submit" value="Guardar"></input>
                </form>
            </div> */}
        </div>
    );
};
