import { Entidad } from "./Entidad.js";
export class Municipio {

  constructor(id,nombre,idDepartamento){

    this.id_municipio= id;
    this.nombre_municipio = nombre;
    this.id_departamento = idDepartamento;
  }
}

export class MunicipioController extends Entidad {
  constructor(objeto = null) {
      super(objeto,"municipio");
  }
}