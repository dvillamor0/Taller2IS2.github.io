import {Persona, PersonaController} from "../../src/Persona.js"
import { TipoDocumentoController } from "../../src/TipoDocumento.js";
import { Vivienda, ViviendaController } from "../../src/Vivienda.js";
import { MunicipioController } from "../../src/Municipio.js";
import { DepartamentoController } from "../../src/Departamento.js";
import { mostrarDatos } from "../../index.js";
import { botonesCRUD } from "./base.js";

window.addEventListener('DOMContentLoaded', async () => {
    const tipodocumentoCtrl = new TipoDocumentoController();
    const tipodocumento = await tipodocumentoCtrl.leer();
    const selectTipoDocumento = document.getElementById('id_tipo_documento');

    tipodocumento.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.id_tipo_documento;
        option.textContent = tipo.nombre_tipo_documento;
        selectTipoDocumento.appendChild(option);
    });

    const viviendaCtrl = new ViviendaController();
    const viviendas = await viviendaCtrl.leer();
    const selectVivienda = document.getElementById('id_vivienda');
    
    viviendas.forEach(vivienda => {
        const option = document.createElement('option');
        option.value = vivienda.id_vivienda;
        option.textContent = vivienda.id_vivienda;
        selectVivienda.appendChild(option);
    });
});



function ObtenerNuevo() {
    const id_tipo_documento = document.getElementById('id_tipo_documento').value;
    const dni = document.getElementById('dni').value;
    const nombre1 = document.getElementById('nombre1').value;
    const nombre2 = document.getElementById('nombre2').value;
    const apellido1 = document.getElementById('apellido1').value;
    const apellido2 = document.getElementById('apellido2').value;
    const mayor_de_edad = document.getElementById('mayor_de_edad').value;
    const id_cabeza_familia = document.getElementById('id_cabeza_familia').value;
    const id_vivienda = document.getElementById('id_vivienda').value;
    
    if (id_tipo_documento && dni && nombre1 && apellido1 && (mayor_de_edad != null) && id_vivienda) {
        const persona = new Persona(
            id_tipo_documento,
            dni,
            nombre1,
            apellido1,
            id_vivienda,
            mayor_de_edad,
            nombre2 ? nombre2 : null,
            apellido2 ? apellido2 : null,
            id_cabeza_familia ? id_cabeza_familia : null
        );
        return persona;
    } else {
        window.alert("Llene todos los campos requeridos");
        return;
    }
}

function ObtenerFiltro() {
    const id_persona_filter = document.getElementById('id_persona_filter').value;
    const id_tipo_documento_filter = "eq";
    const dni_filter = document.getElementById('dni_filter').value;
    const nombre1_filter = document.getElementById('nombre1_filter').value;
    const nombre2_filter = document.getElementById('nombre2_filter').value;
    const apellido1_filter = document.getElementById('apellido1_filter').value;
    const apellido2_filter = document.getElementById('apellido2_filter').value;
    const mayor_de_edad_filter = "eq";
    const id_cabeza_familia_filter = document.getElementById('id_cabeza_familia_filter').value;
    const id_vivienda_filter = "eq";

    const id_persona = document.getElementById('id_persona_filtro');
    const id_tipo_documento = document.getElementById('id_tipo_documento');
    const dni = document.getElementById('dni_filtro');
    const nombre1 = document.getElementById('nombre1_filtro');
    const nombre2 = document.getElementById('nombre2_filtro');
    const apellido1 = document.getElementById('apellido1_filtro');
    const apellido2 = document.getElementById('apellido2_filtro');
    const mayor_de_edad = document.getElementById('mayor_de_edad');
    const id_cabeza_familia = document.getElementById('id_cabeza_familia_filtro');
    const id_vivienda = document.getElementById('id_vivienda');
    
    const campo = {};

    if (id_persona_filter !== "") {
        const filtro = {};
        filtro[id_persona_filter] = id_persona.value;
        campo.id_persona= filtro;
    }

    if (id_tipo_documento.value!== "") {
        const filtro = {};
        filtro[id_tipo_documento_filter] = id_tipo_documento.value;
        campo.id_tipo_documento = filtro;
    }
    
    if (dni_filter!== "") {
        const filtro = {};
        filtro[dni_filter] = dni.value;
        campo.dni = filtro;
    }
    
    if (nombre1_filter!== "") {
        const filtro = {};
        filtro[nombre1_filter] = nombre1.value;
        campo.nombre1 = filtro;
    }
    
    if (nombre2_filter!== "") {
        const filtro = {};
        filtro[nombre2_filter] = nombre2.value;
        campo.nombre2 = filtro;
    }
    
    if (apellido1_filter!== "") {
        const filtro = {};
        filtro[apellido1_filter] = apellido1.value;
        campo.apellido1 = filtro;
    }
    
    if (apellido2_filter!== "") {
        const filtro = {};
        filtro[apellido2_filter] = apellido2.value;
        campo.apellido2 = filtro;
    }
    
    if (mayor_de_edad.value!== "") {
        const filtro = {};
        filtro[mayor_de_edad_filter] = mayor_de_edad.value;
        campo.mayor_de_edad = filtro;
    }
    
    if (id_cabeza_familia_filter!== "") {
        const filtro = {};
        filtro[id_cabeza_familia_filter] = id_cabeza_familia.value;
        campo.id_cabeza_familia = filtro;
    }
    
    if (id_vivienda.value!== "") {
        const filtro = {};
        filtro[id_vivienda_filter] = id_vivienda.value;
        campo.id_recidencia = filtro;
    }

    return campo;
}

async function crear() {
    const persona = ObtenerNuevo();
    const personaCtrl = new PersonaController(persona);
    mostrarDatos(await personaCtrl.crear());
}

async function leer() {
    const filtro = ObtenerFiltro();
    const personaCtrl = new PersonaController();
    mostrarDatos(await personaCtrl.leer(filtro));
}

async function actualizar() {
    const persona = ObtenerNuevo();
    const filtro = ObtenerFiltro();
    const personaCtrl = new PersonaController(persona);
    mostrarDatos(await personaCtrl.actualizar(filtro));
}

function eliminar() {
    const filtro = ObtenerFiltro();
    const personaCtrl = new PersonaController();
    personaCtrl.eliminar(filtro);
}

botonesCRUD(crear,leer,actualizar,eliminar);