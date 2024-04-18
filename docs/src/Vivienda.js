import { Entidad } from "./Entidad.js";

export class Vivienda {

  constructor(direccion,idMunicipio){
    this.direccion=direccion;
    this.id_municipio=idMunicipio;
  }
}

export class ViviendaController extends Entidad {
  constructor(objeto = null) {
      super(objeto,"vivienda");
  }
}