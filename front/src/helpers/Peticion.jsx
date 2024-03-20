export const Peticion = async (
    url,
    metodo = "GET",
    datosGuardar = "",
    archivos = false
) => {
    let datos = [];
    let cargando = true;

    let opciones = {
        method: metodo,
    };

    if (metodo === "GET" || metodo === "DELETE") {
        opciones = {
            method: metodo,
        };
    }
    if (metodo === "POST" || metodo === "PUT") {
        if (archivos) {
            opciones = {
                method: metodo,
                body: datosGuardar,
            };
        } else {
            opciones = {
                method: metodo,
                body: JSON.stringify(datosGuardar),
                headers: {
                    "Content-Type": "application/json",
                },
            };
        }
    }
    const peticion = await fetch(url, opciones);
    datos = await peticion.json();

    cargando = false;

    // console.log(data);

    return {
        datos,
        cargando,
    };
};
