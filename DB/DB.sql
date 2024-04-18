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
    mayor_de_edad BOOL NOT NULL,
    id_cabeza_familia INT,
    id_recidencia INT NOT NULL,
    FOREIGN KEY (id_tipo_documento) REFERENCES TipoDocumento(id_tipo_documento),
    FOREIGN KEY (id_cabeza_familia) REFERENCES Persona(id_persona),
    FOREIGN KEY (id_recidencia) REFERENCES Vivienda(id_vivienda)
);

--Solo los mayores de edad pueden tener C.C
ALTER TABLE Persona
ADD CONSTRAINT chk_tipo_documento_mayor_de_edad
CHECK (
    (id_tipo_documento = 1 AND mayor_de_edad = TRUE) OR (id_tipo_documento <> 1)
);

-- Añade el Gobernador
ALTER TABLE Departamento
ADD COLUMN id_gobernador INT REFERENCES Persona(id_persona);

-- Añadir restricción UNIQUE para asegurar que una persona no pueda gobernar varios departamentos
ALTER TABLE Departamento
ADD CONSTRAINT unique_gobernador UNIQUE (id_gobernador);

-- Crear la tabla Vivienda_Propietario
CREATE TABLE Vivienda_Propietario (
    id_vivienda INT NOT NULL,
    id_persona INT NOT NULL,
    porcentaje_propiedad SMALLINT NOT NULL CHECK (porcentaje_propiedad >= 0 AND porcentaje_propiedad <= 100),
    PRIMARY KEY (id_vivienda, id_persona),
    FOREIGN KEY (id_vivienda) REFERENCES Vivienda(id_vivienda),
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona)
);

-- Agregar restricción CHECK para asegurar que el gobernador tenga id_tipo_documento igual a C.C
ALTER TABLE Persona
ADD CONSTRAINT chk_gobernador_tipo_documento CHECK (id_tipo_documento = 1);

-- Crear la función
CREATE OR REPLACE FUNCTION es_mayor_de_edad(id_persona_check INT) RETURNS BOOLEAN AS $$
DECLARE
    edad_persona BOOLEAN;
BEGIN
    SELECT mayor_de_edad INTO edad_persona
    FROM Persona
    WHERE id_persona = id_persona_check;
    
    RETURN edad_persona;
END;
$$ LANGUAGE plpgsql;

-- Agregar restricción CHECK utilizando la función
ALTER TABLE Persona
ADD CONSTRAINT chk_cabeza_familia_mayor_de_edad 
CHECK (
    (id_cabeza_familia IS NULL AND mayor_de_edad = TRUE) OR
    (id_cabeza_familia IS NOT NULL AND es_mayor_de_edad(id_cabeza_familia) = TRUE)
);

-- Agregar la restricción para que un gobernador resida en el municipio del departamento que gobierna y tenga C.C
CREATE OR REPLACE FUNCTION validate_gobernador_residence()
RETURNS TRIGGER AS $$
DECLARE
    id_departamento_gobernador INT;
    tipo_documento_gobernador INT;
BEGIN
    IF NEW.id_gobernador IS NOT NULL THEN
        SELECT d.id_departamento, p.id_tipo_documento
        INTO id_departamento_gobernador, tipo_documento_gobernador
        FROM Persona p
        JOIN Vivienda v ON v.id_vivienda = p.id_recidencia
        JOIN Municipio m ON m.id_municipio = v.id_municipio
        JOIN Departamento d ON d.id_departamento = m.id_departamento
        WHERE p.id_persona = NEW.id_gobernador;

        IF tipo_documento_gobernador <> 1 THEN
            RAISE EXCEPTION 'El gobernador no tiene C.C';
        END IF;

        IF NEW.id_departamento <> id_departamento_gobernador THEN
            RAISE EXCEPTION 'El gobernador no reside en el municipio del departamento que gobierna.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_gobernador_residence_before_update
BEFORE UPDATE ON Departamento
FOR EACH ROW
EXECUTE PROCEDURE validate_gobernador_residence();

CREATE TRIGGER validate_gobernador_residence_before_insert
BEFORE INSERT ON Departamento
FOR EACH ROW
EXECUTE PROCEDURE validate_gobernador_residence();