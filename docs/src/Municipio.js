import { Entidad } from "./Entidad.js";
export class Municipio {

  constructor(nombre,idDepartamento,id=null){

    id?this.id_municipio= id:undefined;
    this.nombre_municipio = nombre;
    this.id_departamento = idDepartamento;
  }
}

export class MunicipioController extends Entidad {
  constructor(objeto = null) {
      super(objeto,"municipio");
  }
}