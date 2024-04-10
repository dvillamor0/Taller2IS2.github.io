import DataBaseCrud from './DataBaseCRUD.js';

const DataBaseUrl = "https://wljlghncphcbvilwisbe.supabase.co/rest"
const apiKey = window.prompt("supabase apiKey:");
const supabase = new DataBaseCrud(DataBaseUrl, apiKey);
let entidad = null;

document.getElementById('btn-persona').addEventListener('click', usarPersona);
document.getElementById('btn-departamento').addEventListener('click', usarDepartamento);
document.getElementById('btn-municipio').addEventListener('click', usarMunicipio);
document.getElementById('btn-vivienda').addEventListener('click', usarVivienda);
document.getElementById('btn-vivienda-propietario').addEventListener('click', usarViviendaPropietario);

function actualizarEntidadDiv() {
    document.getElementById('entidadDiv').innerText = "Entidad: " + entidad;
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
    const Objetojson = ObtenerJson();
    try {
      const created = await supabase.insert(entidad, Objetojson);
      console.log(entidad+' creada:', created);
      mostrarDatos(created);
    } catch (error) {
      console.error('Error al crear '+entidad+':', error);
    }
  }
  async function leer() {
    const filter = ObtenerFiltro();
    const options = ObtenerOpciones();
    try {
      const entidades = await supabase.read(entidad, '*', filter, options);
      console.log(entidad+' leídas:', entidades);
      mostrarDatos(entidades);
      return entidades;
    } catch (error) {
      console.error('Error al leer '+entidad+':', error);
    }
}
async function actualizar() {
    const Objetojson = ObtenerJson();
    try {
      const updated = await supabase.update(entidad, Objetojson.id, Objetojson);
      console.log(entidad+' actualizada:', updated);
      mostrarDatos(updated);
    } catch (error) {
      console.error('Error al actualizar '+entidad+':', error);
    }
  }
  async function eliminar() {  
    const eliminar = window.confirm("Desea eliminar "+entidad+"?");
        if (eliminar) {
            const Objetojson = ObtenerJson();
        try {
        await supabase.delete(entidad, Objetojson.id);
        window.alert(entidad+' eliminada: '+ Objetojson.id);
        } catch (error) {
        console.error('Error al eliminar'+entidad+':', error);
        }   
    }
  }

  function mostrarDatos(datos) {
    const divDatos = document.getElementById("datos");
    divDatos.innerHTML = ""; // Limpiar el contenido previo
  
    if (Array.isArray(datos)) {
      const tabla = crearTablaHeader(); // Crea el encabezado de la tabla
      datos.forEach(entidad => {
        const fila = crearFilaTabla(entidad);
        tabla.appendChild(fila);
      });
      divDatos.appendChild(tabla);
    } else {
      const tabla = crearTablaHeader();
      const fila = crearFilaTabla(datos);
      tabla.appendChild(fila);
      divDatos.appendChild(tabla);
    }
  }
  
  function crearTablaHeader() {
    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const filaHeader = document.createElement("tr");
    
    const clavesEntidad = Object.keys(datos[0] || {});
  
    clavesEntidad.forEach(clave => {
      const th = document.createElement("th");
      th.textContent = clave;
      filaHeader.appendChild(th);
    });
  
    thead.appendChild(filaHeader);
    tabla.appendChild(thead);
    return tabla;
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
        return { [filterType]: filterObj };
      } catch (error) {
        console.error('Error parsing filter options:', error);
        throw error;
      }
    } else {
      return {};
    }
  }

  function ObtenerOpciones() {
    try {
      const jsonText = document.getElementById('jsonOpciones').value.trim();
      if (jsonText) {
        return JSON.parse(jsonText);
      } else {
        throw new Error('Please enter JSON data in the text area for options.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw error;
    }
  }
  
  