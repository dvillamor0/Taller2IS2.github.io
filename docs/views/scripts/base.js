export function botonesCRUD(crear,leer,actualizar,eliminar) {
    const crearBtn = document.getElementById("crearBtn");
    const leerBtn = document.getElementById("leerBtn");
    const actualizarBtn = document.getElementById("actualizarBtn");
    const eliminarBtn = document.getElementById("eliminarBtn");

    crearBtn.addEventListener("click", crear);
    leerBtn.addEventListener("click", leer);
    actualizarBtn.addEventListener("click", actualizar);
    eliminarBtn.addEventListener("click", eliminar);
}