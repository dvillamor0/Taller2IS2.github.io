import { Entidad } from "./Entidad";

export class ViviendaPropietario extends Entidad{

  constructor(idVivienda,idPersona,porcentajePropiedad){
    this._entidad = "vivienda_propietario";

    this.id_vivienda = idVivienda;
    this.id_persona = idPersona;
    this.porcentaje_propiedad = porcentajePropiedad;
    
  }
}

const vivienda = new ViviendaPropietario(1,1,100);