import { Entidad } from "./Entidad.js";

export class Departamento{
  constructor(nombre,idGobernador=null,id=null){
    this.id_departamento = id;
    this.nombre_departamento=nombre;
    _verificarGobernador(idGobernador);
    this.id_gobernador=idGobernador;
  }

  _verificarGobernador(idGobernador){
    if (idGobernador !== null) {
      window.alert("asegurese de que el gobernador viva en el departamento, sea mayor de edad y este registrado con C.C");
    }
  }

}
export class DepartamentoController extends Entidad{

  constructor(objeto=null){
    super(objeto,"departamento");
  }

}