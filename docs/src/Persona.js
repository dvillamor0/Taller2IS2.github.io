import { Entidad } from "./Entidad.js";
export class Persona {

  constructor(idTipoDocumento, dni, nombre1, apellido1, idVivienda, mayor_de_edad, nombre2 = null, apellido2 = null, idJefeFamilia = null) {

    this.id_tipo_documento = idTipoDocumento;
    this.dni = dni;
    this.nombre1 = nombre1;
    nombre2?this.nombre2 = nombre2:undefined;
    this.apellido1 = apellido1;
    apellido2?this.apellido2 = apellido2:undefined;
    this.mayor_de_edad = mayor_de_edad;
    idJefeFamilia?this.id_cabeza_familia = idJefeFamilia:undefined;
    this.id_recidencia = idVivienda;

    if (this.id_tipo_documento === 1 && !this.mayor_de_edad) {
      throw new Error("La persona debe ser mayor de edad para tener C.C.");
    }
    if (this.id_cabeza_familia !== null && !this.mayor_de_edad) {
      throw new Error("El cabeza de familia debe ser mayor de edad.");
    }
  }
}

export class PersonaController extends Entidad {
  constructor(objeto = null) {
    super(objeto,"persona");
  }
}