import { Entidad } from "./Entidad.js";

export class Vivienda {

  constructor(direccion,idMunicipio,id=null){

    id?this.id_vivienda=id:undefined;
    this.direccion=direccion;
    this.id_municipio=idMunicipio;
  }
}

export class ViviendaController extends Entidad {
  constructor(objeto = null) {
      super(objeto,"vivienda");
  }
}