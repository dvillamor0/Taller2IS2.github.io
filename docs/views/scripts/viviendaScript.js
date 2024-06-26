import { Vivienda, ViviendaController } from "../../src/Vivienda.js";
import { MunicipioController } from "../../src/Municipio.js";
import { DepartamentoController } from "../../src/Departamento.js";
import { mostrarDatos } from "../../index.js";
import { botonesCRUD } from "./base.js";

// Llenar select de departamentos al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
    const departamentoCtrl = new DepartamentoController();
    const departamentos = await departamentoCtrl.leer();
    const selectDepartamento = document.getElementById('id_departamento');

    departamentos.forEach(departamento => {
        const option = document.createElement('option');
        option.value = departamento.id_departamento;
        option.textContent = departamento.nombre_departamento;
        selectDepartamento.appendChild(option);
    });

});

id_municipio.addEventListener('focus', async () => {
    const municipioCtrl = new MunicipioController();
    const filtro = ObtenerMunicipios()
    const municipios = await municipioCtrl.leer(filtro);
    const selectMunicipio = document.getElementById('id_municipio');

    municipios.forEach(municipio => {
        const option = document.createElement('option');
        option.value = municipio.id_municipio;
        option.textContent = municipio.nombre_municipio;
        selectMunicipio.append(option);
    });
});

id_departamento.addEventListener('change', function(){
    const selectMunicipio = document.getElementById('id_municipio');
    selectMunicipio.replaceChildren("");
});

function ObtenerNuevo() {
    const direccion = document.getElementById('direccion').value;
    const id_municipio = document.getElementById('id_municipio').value;

    if (direccion && id_municipio) {
        const vivienda = new Vivienda(
            direccion,
            id_municipio
        );
        return vivienda;
    } else {
        window.alert("Llene todos los campos requeridos");
        return;
    }
}

function ObtenerFiltro() {
    const id_vivienda_filter = document.getElementById('id_vivienda_filter').value;
    const direccion_filter = document.getElementById('direccion_filter').value;
    const id_municipio_filter = "eq"

    const id_vivienda = document.getElementById('id_vivienda_filtro');
    const direccion = document.getElementById('direccion_filtro');
    const id_municipio = document.getElementById('id_municipio');

    const campo = {};

    if (id_vivienda_filter !== "") {
        const filtro = {};
        filtro[id_vivienda_filter] = id_vivienda.value;
        campo.id_vivienda = filtro;
    }

    if (direccion_filter !== "") {
        const filtro = {};
        filtro[direccion_filter] = "%"+direccion.value+"%";
        campo.direccion = filtro;
    }

    if (id_municipio.value !== "") {
        const filtro = {};
        filtro[id_municipio_filter] = id_municipio.value;
        campo.id_municipio = filtro;
    }

    return campo;
}

function ObtenerMunicipios() {

    const id_departamento_filter = "eq"
    const id_departamento = document.getElementById('id_departamento');

    const campo = {};

    const filtro = {};
    filtro[id_departamento_filter] = id_departamento.value;
    campo.id_departamento = filtro;

    return campo;
}

async function crear() {
    const vivienda = ObtenerNuevo();
    const viviendaCtrl = new ViviendaController(vivienda);
    mostrarDatos(await viviendaCtrl.crear());
}

async function leer() {
    const filtro = ObtenerFiltro();
    const viviendaCtrl = new ViviendaController();
    mostrarDatos(await viviendaCtrl.leer(filtro));
}

async function actualizar() {
    const vivienda = ObtenerNuevo();
    const filtro = ObtenerFiltro();
    const viviendaCtrl = new ViviendaController(vivienda);
    mostrarDatos(await viviendaCtrl.actualizar(filtro));
}

function eliminar() {
    const filtro = ObtenerFiltro();
    const viviendaCtrl = new ViviendaController();
    viviendaCtrl.eliminar(filtro);
}

botonesCRUD(crear,leer,actualizar,eliminar);