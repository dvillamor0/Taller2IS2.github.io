-- Crear la tabla Departamento
CREATE TABLE Departamento (
    id_departamento SERIAL PRIMARY KEY,
    nombre_departamento VARCHAR(64) NOT NULL
);

-- Crear la tabla Municipio
CREATE TABLE Municipio (
    id_municipio SERIAL PRIMARY KEY,
    nombre_municipio VARCHAR(128) NOT NULL,
    id_departamento INT NOT NULL,
    FOREIGN KEY (id_departamento) REFERENCES Departamento(id_departamento)
);

-- Crear la tabla Vivienda
CREATE TABLE Vivienda (
    id_vivienda SERIAL PRIMARY KEY,
    direccion VARCHAR(256) NOT NULL,
    id_municipio INT NOT NULL,
    FOREIGN KEY (id_municipio) REFERENCES Municipio(id_municipio)
);

-- Crear la tabla TipoDocumento
CREATE TABLE TipoDocumento (
    id_tipo_documento SERIAL PRIMARY KEY,
    nombre_tipo_documento VARCHAR(64) NOT NULL
);

-- Crear la tabla Persona
CREATE TABLE Persona (
    id_persona SERIAL PRIMARY KEY,
    id_tipo_documento INT NOT null,
    dni VARCHAR(32) NOT NULL,
    nombre1 VARCHAR(64) NOT NULL,
    nombre2 VARCHAR(128),
    apellido1 VARCHAR(64) NOT NULL,
    apellido2 VARCHAR(128),
    id_cabeza_familia INT,
    id_recidencia INT NOT NULL,
    FOREIGN KEY (id_tipo_documento) REFERENCES TipoDocumento(id_tipo_documento),
    FOREIGN KEY (id_cabeza_familia) REFERENCES Persona(id_persona),
    FOREIGN KEY (id_recidencia) REFERENCES Vivienda(id_vivienda)
);

-- Añade el Gobernador
ALTER TABLE Departamento
ADD COLUMN id_gobernador INT NOT NULL REFERENCES Persona(id_persona);

-- Crear la tabla Vivienda_Propietario
CREATE TABLE Vivienda_Propietario (
    id_vivienda INT NOT NULL,
    id_persona INT NOT NULL,
    porcentaje_propiedad SMALLINT NOT NULL CHECK (porcentaje_propiedad >= 0 AND porcentaje_propiedad <= 100),
    PRIMARY KEY (id_vivienda, id_persona),
    FOREIGN KEY (id_vivienda) REFERENCES Vivienda(id_vivienda),
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona)
);