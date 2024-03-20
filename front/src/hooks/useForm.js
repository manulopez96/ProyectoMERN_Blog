import { useState } from "react";

export const useForm = (objetoInicial = {}) => {
    const [formulario, setFormulario] = useState(objetoInicial);

    const serializarFormulario = (formulario) => {
        const formData = new FormData(formulario);

        const objetoCompleto = {};

        for (let [name, value] of formData) {
            objetoCompleto[name] = value;
        }

        console.log(objetoCompleto);
        return objetoCompleto;
    };

    const enviado = (e) => {
        e.preventDefault();

        // let {target} = e;
        // console.log(target);
        // let curso = {
        //     titulo: target.titulo.value,
        //     anio: target.anio.value,
        //     descripcion: target.descripcion.value,
        //     autor: target.autor.value,
        //     email: target.email.value,
        // }
        // console.log(curso);
        // setformulario(curso);

        let curso = serializarFormulario(e.target);
        setFormulario(curso);

        // e.target.classList.add("enviado");
        document.querySelector(".pre").classList.add("enviado");
    };
    const cambiado = ({ target }) => {
        const { name, value } = target;
        setFormulario({
            ...formulario,
            [name]: value,
        });
    };

    return {
        formulario,
        enviado,
        cambiado,
    };
};
