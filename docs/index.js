import { DataBaseCRUD } from './DataBaseCRUD.js';

const DataBaseUrl = "https://wljlghncphcbvilwisbe.supabase.co/rest"
const apiKey = window.prompt("supabase apiKey:");
const supabase = new DataBaseCRUD(DataBaseUrl, apiKey);
let entidad = null;

document.getElementById('btn-persona').addEventListener('click', usarPersona);
document.getElementById('btn-departamento').addEventListener('click', usarDepartamento);
document.getElementById('btn-municipio').addEventListener('click', usarMunicipio);
document.getElementById('btn-vivienda').addEventListener('click', usarVivienda);
document.getElementById('btn-vivienda-propietario').addEventListener('click', usarViviendaPropietario);

function actualizarEntidadDiv() {
    document.getElementById('entidadDiv').innerText = "Entidad: " + entidad;
    const entidadTemplateDiv = document.getElementById('entidadTemplate');
    
    let entidadTemplate = "";
    switch (entidad) {
        case 'departamento':
          entidadTemplate = '{"id_departamento": id, "nombre_departamento": "nombre", "id_gobernador": idGobernador}';          
          break;
        case 'municipio':
            entidadTemplate = '{"id_municipio": id, "nombre_municipio": "nombre", "id_departamento": idDepartamento}';
            break;
        case 'vivienda':
            entidadTemplate = '{"id_vivienda": id, "direccion": "direccion", "id_municipio": idMunicipio}';
            break;
        case 'tipoDocumento':
            entidadTemplate = '{"id_tipo_documento": id, "nombre_tipo_documento": "nombre"}';
          break;
        case 'persona':
            entidadTemplate = '{"id_persona": id, "id_tipo_documento": idTipoDocumento, "dni": "dni", "nombre1": "nombre1", "nombre2": "nombre2", "apellido1": "apellido1", "apellido2": "apellido2", "id_cabeza_familia": idJefeFamilia, "id_recidencia": idVivienda}';
          break;
        case 'vivienda_propietario':
            entidadTemplate = '{"id_vivienda": idVivienda, "id_persona": idPersona, "porcentaje_propiedad": porcentajePropiedad}';
          break;
        default:
          entidadTemplateDiv.innerHTML = 'Entidad no reconocida';
    }

    entidadTemplateDiv.innerText = entidadTemplate;
}



function usarPersona() {
    entidad = "persona";
    actualizarEntidadDiv();
}

function usarDepartamento() {
    entidad = "departamento";
    actualizarEntidadDiv();
}

function usarMunicipio() {
    entidad = "municipio";
    actualizarEntidadDiv();
}

function usarVivienda() {
    entidad = "vivienda";
    actualizarEntidadDiv();
}

function usarViviendaPropietario() {
    entidad = "vivienda_propietario";
    actualizarEntidadDiv();
}

const btnCrear = document.getElementById('btn-crear');
const btnLeer = document.getElementById('btn-leer');
const btnActualizar = document.getElementById('btn-actualizar');
const btnEliminar = document.getElementById('btn-eliminar');

btnCrear.addEventListener('click', crear);
btnLeer.addEventListener('click', leer);
btnActualizar.addEventListener('click', actualizar);
btnEliminar.addEventListener('click', eliminar);

async function crear() {
    if (!entidad) {
        window.alert("Seleccione una entidad");
        return;
    }
    const Objetojson = ObtenerJson();
    try {
      const created = await supabase.insert(entidad, Objetojson);
      console.log(entidad+' creado:', created);
      mostrarDatos(created);
    } catch (error) {
      console.error('Error al crear '+entidad+':', error);
    }
  }
  async function leer() {
    if (!entidad) {
        window.alert("Seleccione una entidad");
        return;
    }
    const filter = ObtenerFiltro();
    try {
      const entidades = await supabase.read(entidad, '*', filter);
      console.log(entidad+' leídos:', entidades);
      mostrarDatos(entidades);
      return entidades;
    } catch (error) {
      console.error('Error al leer '+entidad+':', error);
    }
}
async function actualizar() {
    if (!entidad) {
        window.alert("Seleccione una entidad");
        return;
    }
    const Objetojson = ObtenerJson();
    const filter = ObtenerFiltro();
    try {
      const updated = await supabase.update(entidad, filter, Objetojson);
      console.log(entidad+' actualizado:', updated);
      mostrarDatos(updated);
    } catch (error) {
      console.error('Error al actualizar '+entidad+':', error);
    }
  }
  async function eliminar() {
    if (!entidad) {
        window.alert("Seleccione una entidad");
        return;
    }  
    const eliminar = window.confirm("Desea eliminar "+entidad+"?");
      if (eliminar) {
          const filter = ObtenerFiltro();
          try {
              await supabase.delete(entidad, filter);
              window.alert(entidad + ' eliminado con criterios: ' + JSON.stringify(filter));
          } catch (error) {
              console.error('Error al eliminar' + entidad + ':', error);
          }
      }
  }

  function mostrarDatos(datos) {
    const divDatos = document.getElementById("datos");
    divDatos.innerHTML = ""; // Limpiar el contenido previo
  
    if (Array.isArray(datos)) {
      const tabla = crearTablaHeader(datos[0]);
      datos.forEach(entidad => {
        const fila = crearFilaTabla(entidad);
        tabla[1].appendChild(fila);
      });
      divDatos.appendChild(tabla[0]);
    } else {
      const tabla = crearTablaHeader(datos);
      const fila = crearFilaTabla(datos);
      tabla[1].appendChild(fila);
      divDatos.appendChild(tabla[0]);
    }
  }
  
  function crearTablaHeader(dato) {
    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    
    tabla.classList.add("table", "table-striped","table-bordered");
    thead.classList.add("thead-dark");
    
    const filaHeader = document.createElement("tr");
    
    const clavesEntidad = Object.keys(dato || {});
  
    clavesEntidad.forEach(clave => {
      const th = document.createElement("th");
      th.textContent = clave;
      filaHeader.appendChild(th);
    });
  
    thead.appendChild(filaHeader);
    tabla.appendChild(thead);
    
    const tbody = document.createElement("tbody");
    tabla.appendChild(tbody);
    return [tabla,tbody];
  }
  
  function crearFilaTabla(entidad) {
    const fila = document.createElement("tr");
    const clavesEntidad = Object.keys(entidad);
  
    clavesEntidad.forEach(clave => {
      const td = document.createElement("td");
      td.textContent = entidad[clave];
      fila.appendChild(td);
    });
  
    return fila;
  }

  function ObtenerJson() {
    try {
      const jsonText = document.getElementById('jsonEntidad').value.trim();
      if (jsonText) {
        return JSON.parse(jsonText);
      } else {
        throw new Error('Please enter JSON data in the text area for object.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw error;
    }
  }

  function ObtenerFiltro() {
    const filterSelect = document.getElementById('filterSelect');
    const filterType = filterSelect.value;
    const filterValue = document.getElementById('jsonOpciones').value.trim();
  
    if (filterType !== '' && filterValue) {
      try {
        const filterObj = JSON.parse(filterValue);
        const filtro = { [filterType]: filterObj };
        return filtro;
      } catch (error) {
        console.error('Error parsing filter options:', error);
        throw error;
      }
    } else {
      return {};
    }
  }
  
  