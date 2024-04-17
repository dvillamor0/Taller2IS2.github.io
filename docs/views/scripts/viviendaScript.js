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
    const selectMunicipio = document.getElementById('id_municipio');

    departamentos.forEach(departamento => {
        const option = document.createElement('option');
        option.value = departamento.id_departamento;
        option.textContent = departamento.nombre_departamento;
        selectDepartamento.appendChild(option);
    });

});

id_municipio.addEventListener('focus', async () => {
    const municipioCtrl = new MunicipioController();
    const filtro = ObtenerFiltro()
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
    const id_vivienda = document.getElementById('id_vivienda').value;
    const direccion = document.getElementById('direccion').value;
    const id_departamento = document.getElementById('id_departamento').value;
    const id_municipio = document.getElementById('id_municipio').value;

    if (id_vivienda && id_vivienda && id_departamento && id_municipio) {
        return new Vivienda(id_vivienda, direccion, id_municipio);
    } else {
        window.alert("Llene todos los campos");
        return;
    }
}

function ObtenerFiltro() {
    const id_vivienda_filter = document.getElementById('id_vivienda_filter').value;
    const direccion_filter = document.getElementById('direccion_filter').value;
    const id_departamento_filter = "eq"

    const id_vivienda = document.getElementById('id_vivienda_filtro');
    const direccion = document.getElementById('direccion_filtro');
    const id_departamento = document.getElementById('id_departamento');


    const campo = {};

    if (id_vivienda_filter !== "") {
        const filtro = {};
        filtro[id_vivienda_filter] = id_vivienda.value;
        console.log("vivienda: ", filtro);
        campo.id_vivienda = filtro;
    }

    if (direccion_filter !== "") {
        const filtro = {};
        filtro[direccion_filter] = "%"+direccion.value+"%";
        console.log("direccion: ", filtro);
        campo.direccion = filtro;
    }

    const filtro = {};
    filtro[id_departamento_filter] = id_departamento.value;
    console.log("departamento: ", filtro);
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