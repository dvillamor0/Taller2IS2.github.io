import { Entidad } from "./Entidad";

export class Vivienda extends Entidad{

  constructor(id,direccion,idMunicipio){
    this._entidad = "vivienda";

    this.id_vivienda= id;
    this.direccion=direccion;
    this.id_municipio=idMunicipio;
    
  }
}