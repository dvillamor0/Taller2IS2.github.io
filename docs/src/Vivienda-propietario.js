import { Entidad } from "./Entidad.js";

export class ViviendaPropietario {

  constructor(idVivienda,idPersona,porcentajePropiedad){

    this.id_vivienda = idVivienda;
    this.id_persona = idPersona;
    this.porcentaje_propiedad = porcentajePropiedad;
  }
}

export class ViviendaPropietarioController extends Entidad {
  constructor(objeto = null) {
      super(objeto,"vivienda_propietario");
  }
}