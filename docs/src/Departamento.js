import { Entidad } from "./Entidad";

export class Departamento extends Entidad{

  constructor(id,nombre,idGobernador=null){
    this._entidad = "departamento";

    this.id_departamento= id;
    this.nombre_departamento=nombre;
    this.id_gobernador=idGobernador;
    
  }

  _verificarGobernador(){
    if (this.id_gobernador !== null) {
      window.alert("asegurese de que el gobernador viva en el departamento, sea mayor de edad y este registrado con C.C");
    }
  }

}