export class Entidad {

    constructor(entidad) {
        this._entidad = entidad;
    }

    async crear() {
        const Objetojson = this.ObtenerJson();
        try {
            const created = await supabase.insert(this._entidad, Objetojson);
            console.log(this._entidad + ' creado:', created);
            mostrarDatos(created);
        } catch (error) {
            console.error('Error al crear ' + this._entidad + ':', error);
        }
    }
    async leer() {
        const filter = this.ObtenerFiltro();
        try {
            const entidades = await supabase.read(this._entidad, '*', filter);
            console.log(this._entidad + ' leídos:', entidades);
            mostrarDatos(entidades);
            return entidades;
        } catch (error) {
            console.error('Error al leer ' + this._entidad + ':', error);
        }
    }
    async actualizar() {
        const Objetojson = this.ObtenerJson();
        const filter = this.ObtenerFiltro();
        try {
            const updated = await supabase.update(this._entidad, filter, Objetojson);
            console.log(this._entidad + ' actualizado:', updated);
            mostrarDatos(updated);
        } catch (error) {
            console.error('Error al actualizar ' + this._entidad + ':', error);
        }
    }
    async eliminar() {
        const eliminar = window.confirm("Desea eliminar " + this._entidad + "?");
        if (eliminar) {
            const filter = this.ObtenerFiltro();
            try {
                await supabase.delete(this._entidad, filter);
                window.alert(this._entidad + ' eliminado con criterios: ' + JSON.stringify(filter));
            } catch (error) {
                console.error('Error al eliminar' + this._entidad + ':', error);
            }
        }
    }

}