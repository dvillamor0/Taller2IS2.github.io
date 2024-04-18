import { mostrarDatos } from "../../index.js";
import { botonesCRUD } from "./base.js";
import { ViviendaController } from "../../src/Vivienda.js";
import { PersonaController } from "../../src/Persona.js";
import { ViviendaPropietario, ViviendaPropietarioController } from "../../src/Vivienda-propietario.js";

window.addEventListener('DOMContentLoaded', async () => {
    const viviendaCtrl = new ViviendaController();
    const viviendas = await viviendaCtrl.leer();

    const personaCtrl = new PersonaController();
    const personas = await personaCtrl.leer();

    const selectViviendaFiltro = document.getElementById('id_vivienda_filtro');
    const selectViviendaNuevo = document.getElementById('id_vivienda');

    const selectPersonaFiltro = document.getElementById('id_persona_filtro');
    const selectPersonaNuevo = document.getElementById('id_persona');

    viviendas.forEach(vivienda => {
        const option = document.createElement('option');
        option.value = vivienda.id_vivienda;
        option.textContent = vivienda.direccion;
        selectViviendaFiltro.appendChild(option.cloneNode(true));
        selectViviendaNuevo.appendChild(option);
    });

    personas.forEach(persona => {
        const option = document.createElement('option');
        option.value = persona.id_persona;
        option.textContent = `${persona.dni} ${persona.nombre1}${persona.nombre2 ? " " + persona.nombre2 : ""} ${persona.apellido1}${persona.apellido2 ? " " + persona.apellido2 : ""}`;
        selectPersonaFiltro.appendChild(option.cloneNode(true));
        selectPersonaNuevo.appendChild(option);
    });
});

function ObtenerNuevo() {
    const id_vivienda = document.getElementById('id_vivienda').value;
    const id_persona = document.getElementById('id_persona').value;
    const porcentaje_propiedad = document.getElementById('porcentaje_propiedad').value;

    if (!id_vivienda) {
        window.alert("vivienda requerido");
        return;
    }
    if (!id_persona) {
        window.alert("persona requerido");
        return;
    }
    if (!porcentaje_propiedad) {
        window.alert("porcentaje de la propiedad requerido");
        return;
    }
    const viviendaPropietario = new ViviendaPropietario(
        id_vivienda,
        id_persona,
        porcentaje_propiedad
    );
    return viviendaPropietario;
}

function ObtenerFiltro() {
    const id_vivienda = document.getElementById('id_vivienda_filtro');
    const id_persona = document.getElementById('id_persona_filtro');

    const campo = {};

    if (id_vivienda.value !== "") {
        const filtro = {};
        filtro[id_vivienda_filter] = id_vivienda.value;
        campo.id_vivienda = filtro;
    }

    if (id_persona.value !== "") {
        const filtro = {};
        filtro[id_persona_filter] = id_persona.value;
        campo.id_persona = filtro;
    }
    return campo;
}

async function crear() {
    const viviendaPropietario = ObtenerNuevo();
    const viviendaPropietarioCtrl = new ViviendaPropietarioController(viviendaPropietario);
    mostrarDatos(await viviendaPropietarioCtrl.crear());
}

async function leer() {
    const filtro = ObtenerFiltro();
    const viviendaPropietarioCtrl = new ViviendaPropietarioController();
    mostrarDatos(await viviendaPropietarioCtrl.leer(filtro));
}

async function actualizar() {
    const viviendaPropietario = ObtenerNuevo();
    const filtro = ObtenerFiltro();
    const viviendaPropietarioCtrl = new ViviendaPropietarioController(viviendaPropietario);
    mostrarDatos(await viviendaPropietarioCtrl.actualizar(filtro));
}

function eliminar() {
    const filtro = ObtenerFiltro();
    const viviendaPropietarioCtrl = new ViviendaPropietarioController();
    viviendaPropietarioCtrl.eliminar(filtro);
}

botonesCRUD(crear,leer,actualizar,eliminar);