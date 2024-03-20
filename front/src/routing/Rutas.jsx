//import React from "react";
import {
    Routes,
    Route,
    BrowserRouter,
    // Navigate,
} from "react-router-dom";
import { Inicio } from "../components/pages/Inicio";
import { Articulos } from "../components/pages/Articulos";
import { Crear } from "../components/pages/Crear";
import { Editar } from "../components/pages/Editar";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Busqueda } from "../components/pages/Busqueda";
import { Articulo } from "../components/pages/Articulo";

export const Rutas = () => {
    return (
        <BrowserRouter>
            {/* layaout */}
            <Header></Header>
            <Nav></Nav>

            {/* contenido central y rutas */}
            <section id="content" className="content">
                <Routes>
                    <Route path="/" element={<Inicio></Inicio>}></Route>
                    <Route path="/inicio" element={<Inicio></Inicio>}></Route>
                    <Route path="/articulos" element={<Articulos></Articulos>}></Route>
                    <Route path="/crear" element={<Crear></Crear>}></Route>
                    <Route path="/buscar/:busqueda" element={<Busqueda></Busqueda>}></Route>
                    <Route path="/articulo/:id" element={<Articulo></Articulo>}></Route>
                    <Route path="/editar/:id" element={<Editar></Editar>}></Route>
                    <Route path="*" element={
                        <div className="jumbo">
                            <h1>Error 404</h1>
                        </div>
                    }></Route>
                </Routes>
            </section>
            <Sidebar></Sidebar>
            <Footer></Footer>
        </BrowserRouter>
    );
};
