window.onload = function () {
  let contenidoGuardado = localStorage.getItem("apiKey");
  if (!((contenidoGuardado != null) && (contenidoGuardado != undefined))) {
    window.alert("no se encontro la llave del api, por favor ingresela");
  }
};

export function mostrarDatos(datos) {
  const divDatos = document.getElementById("datos");
  divDatos.innerHTML = "";

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