import { DataBaseCRUD } from "../DataBaseCRUD.js";

let supabase = null;

window.addEventListener('DOMContentLoaded', async () =>  {
    let contenidoGuardado = localStorage.getItem("apiKey");
    if ((contenidoGuardado != null) && (contenidoGuardado != undefined) ) {
        let apiKey = contenidoGuardado;
        supabase = DataBaseCRUD.getInstancia(apiKey);
    } else {
        window.alert("no se encontro la llave del api, por favor ingresela");
    }
});

export class Entidad {
    constructor(objeto, entidad) {
        this._entidad = entidad;
        this.objeto = objeto;
    }

    async crear() {
        try {
            const created = await supabase.insert(this._entidad, this.objeto);
            console.log(this._entidad + ' creado:', created);
            return created;
        } catch (error) {
            console.error('Error al crear ' + this._entidad + ':', error);
        }
    }
    async leer(filter) {
        try {
            const entidades = await supabase.read(this._entidad, '*', filter);
            console.log(this._entidad + ' leídos:', entidades);
            return entidades;
        } catch (error) {
            console.error('Error al leer ' + this._entidad + ':', error);
        }
    }
    async actualizar(filter) {
        try {
            console.log("PPPPPPPPPPPPP filtro objeto",filter,this.objeto);
            const updated = await supabase.update(this._entidad, filter, this.objeto);
            console.log(this._entidad + ' actualizado:', updated);
            return updated;
        } catch (error) {
            console.error('Error al actualizar ' + this._entidad + ':', error);
        }
    }
    async eliminar(filter) {
        const eliminar = window.confirm("Desea eliminar " + this._entidad + " y el filtro actual?");
        if (eliminar) {
            try {
                await supabase.delete(this._entidad, filter);
                window.alert(this._entidad + ' eliminado con criterios: ' + JSON.stringify(filter));
            } catch (error) {
                console.error('Error al eliminar' + this._entidad + ':', error);
            }
        }
    }

}