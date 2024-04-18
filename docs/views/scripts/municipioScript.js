
import { Municipio, MunicipioController } from "../../src/Municipio.js";
import { DepartamentoController } from "../../src/Departamento.js";
import { mostrarDatos } from "../../index.js";
import { botonesCRUD } from "./base.js";

// Llenar select de departamentos al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
    const departamentoCtrl = new DepartamentoController();
    const departamentos = await departamentoCtrl.leer();
    const selectFiltro = document.getElementById('id_departamento_filtro');
    const selectNuevo = document.getElementById('id_departamento');

    departamentos.forEach(departamento => {
        const option = document.createElement('option');
        option.value = departamento.id_departamento;
        option.textContent = departamento.nombre_departamento;
        selectFiltro.appendChild(option.cloneNode(true));
        selectNuevo.appendChild(option);
    });
});

function ObtenerNuevo() {
    const id_municipio = document.getElementById('id_municipio').value;
    const nombre_municipio = document.getElementById('nombre_municipio').value;
    const id_departamento = document.getElementById('id_departamento').value;

    if (!nombre_municipio) {
        window.alert("Nombre requerido");
        return;
    }
    const municipio = new Municipio(
        nombre_municipio,
        id_departamento,
        id_municipio?id_municipio:null
    );
    return municipio;
}

function ObtenerFiltro() {
    const id_municipio_filter = document.getElementById('id_municipio_filter').value;
    const nombre_municipio_filter = document.getElementById('nombre_municipio_filter').value;
    const id_departamento_filter = "eq"

    const id_municipio = document.getElementById('id_municipio_filtro');
    const nombre_municipio = document.getElementById('nombre_municipio_filtro');
    const id_departamento = document.getElementById('id_departamento_filtro');

    const campo = {};

    if (id_municipio_filter !== "") {
        const filtro = {};
        filtro[id_municipio_filter] = id_municipio.value;
        campo.id_municipio = filtro;
    }

    if (nombre_municipio_filter !== "") {
        const filtro = {};
        filtro[nombre_municipio_filter] = "%"+nombre_municipio.value+"%";
        campo.nombre_municipio = filtro;
    }

    if (id_departamento_filter !== "") {
        const filtro = {};
        filtro[id_departamento_filter] = id_departamento.value;
        campo.id_departamento = filtro;
    }

    return campo;
}

async function crear() {
    const municipio = ObtenerNuevo();
    const municipioCtrl = new MunicipioController(municipio);
    mostrarDatos(await municipioCtrl.crear());
}

async function leer() {
    const filtro = ObtenerFiltro();
    const municipioCtrl = new MunicipioController();
    mostrarDatos(await municipioCtrl.leer(filtro));
}

async function actualizar() {
    const municipio = ObtenerNuevo();
    const filtro = ObtenerFiltro();
    const municipioCtrl = new MunicipioController(municipio);
    mostrarDatos(await municipioCtrl.actualizar(filtro));
}

function eliminar() {
    const filtro = ObtenerFiltro();
    const municipioCtrl = new MunicipioController();
    municipioCtrl.eliminar(filtro);
}

botonesCRUD(crear,leer,actualizar,eliminar);