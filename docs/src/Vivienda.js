import { Entidad } from "./Entidad.js";

export class Vivienda {

  constructor(id,direccion,idMunicipio){

    this.id_vivienda=id;
    this.direccion=direccion;
    this.id_municipio=idMunicipio;
  }
}

export class ViviendaController extends Entidad {
  constructor(objeto = null) {
      super(objeto,"vivienda");
  }
}