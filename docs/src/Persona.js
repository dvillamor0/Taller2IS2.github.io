import { Entidad } from "./Entidad";

export class Persona extends Entidad{

  constructor(id,idTipoDocumento,dni,nombre1,apellido1,idVivienda,mayor_de_edad,nombre2=null,apellido2=null,idJefeFamilia=null){
    this._entidad = "persona";

    this.id_persona = id;
    this.id_tipo_documento = idTipoDocumento;
    this.dni = dni;
    this.nombre1 = nombre1;
    this.nombre2 = nombre2;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.mayor_de_edad = mayor_de_edad;
    this.id_cabeza_familia = idJefeFamilia;
    this.id_recidencia = idVivienda;
    
  }
}