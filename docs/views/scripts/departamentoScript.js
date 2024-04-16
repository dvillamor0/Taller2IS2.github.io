import { Departamento, DepartamentoController } from "../../src/Departamento.js";
import { mostrarDatos } from "../../index.js";
import { botonesCRUD } from "./base.js";

function ObtenerNuevo() {
    const id_departamento = document.getElementById('id_departamento').value;
    const nombre_departamento = document.getElementById('nombre_departamento').value;
    const id_gobernador = document.getElementById('id_gobernador').value;

    if (!nombre_departamento) {
        window.alert("nombre requerido");
        return;
    }

    if (id_gobernador) {
        if (id_departamento) {
            return new Departamento(nombre_departamento, id_gobernador, id_departamento);
        }
        return new Departamento(nombre_departamento, id_gobernador);
    }
    return new Departamento(nombre_departamento);
}

function ObtenerFiltro() {
    const id_departamento_filter = document.getElementById('id_departamento_filter').value;
    const nombre_departamento_filter = document.getElementById('nombre_departamento_filter').value;
    const id_gobernador_filter = document.getElementById('id_gobernador_filter').value;

    const id_departamento = document.getElementById('id_departamento_filtro');
    const nombre_departamento = document.getElementById('nombre_departamento_filtro');
    const id_gobernador = document.getElementById('id_gobernador_filtro');

    const campo = {};

    if (id_departamento_filter !== "") {
        const filtro = {};
        filtro[id_departamento_filter] = id_departamento.value;
        campo.id_departamento = filtro;
    }

    if (nombre_departamento_filter !== "") {
        const filtro = {};
        filtro[nombre_departamento_filter] = nombre_departamento.value;
        campo.nombre_departamento = filtro;
    }

    if (id_gobernador_filter !== "") {
        const filtro = {};
        filtro[id_gobernador_filter] = id_gobernador.value;
        campo.id_gobernador = filtro;
    }

    return campo;
}

async function crear() {
    const departamento = ObtenerNuevo();
    const departamentoCtrl = new DepartamentoController(departamento);
    mostrarDatos(await departamentoCtrl.crear());
}

async function leer() {
    const filtro = ObtenerFiltro();
    const departamentoCtrl = new DepartamentoController();
    mostrarDatos(await departamentoCtrl.leer(filtro));
}

async function actualizar() {
    const departamento = ObtenerNuevo();
    const filtro = ObtenerFiltro();
    const departamentoCtrl = new DepartamentoController(departamento);
    mostrarDatos(await departamento.actualizar(filtro));
}

function eliminar() {
    const filtro = ObtenerFiltro();
    const departamentoCtrl = new DepartamentoController();
    departamentoCtrl.eliminar(filtro);
}

botonesCRUD(crear,leer,actualizar,eliminar);