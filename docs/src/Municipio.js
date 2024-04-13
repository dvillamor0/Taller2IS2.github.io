import { Entidad } from "./Entidad";

export class Municipio extends Entidad{

  constructor(id,nombre,idDepartamento){
    this._entidad = "municipio";

    this.id_municipio= id;
    this.nombre_municipio = nombre;
    this.id_departamento = idDepartamento;
    
  }
}