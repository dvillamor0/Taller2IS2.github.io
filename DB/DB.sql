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
    (id_tipo_documento = 1 AND mayor_de_edad = TRUE)
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

CREATE OR REPLACE FUNCTION check_total_percentage(vivienda_id INT, new_percentage INT)
RETURNS VOID AS $$
DECLARE
    current_total_percentage INT;
BEGIN
    -- Calcular el total actual de porcentaje para la vivienda especificada
    SELECT COALESCE(SUM(porcentaje_propiedad), 0) INTO current_total_percentage
    FROM Vivienda_Propietario
    WHERE id_vivienda = vivienda_id;

    -- Sumar el nuevo porcentaje al total actual
    current_total_percentage := current_total_percentage + new_percentage;

    -- Validar que el total no exceda el 100%
    IF current_total_percentage > 100 THEN
        RAISE EXCEPTION 'La suma de los porcentajes no puede superar el 100%%. Total actual: %', current_total_percentage;
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION before_insert_vivienda_propietario()
RETURNS TRIGGER AS $$
BEGIN
    -- Llamar a la función para verificar el total del porcentaje
    PERFORM check_total_percentage(NEW.id_vivienda, NEW.porcentaje_propiedad);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_percentage_before_insert
BEFORE INSERT ON Vivienda_Propietario
FOR EACH ROW EXECUTE FUNCTION before_insert_vivienda_propietario();

CREATE OR REPLACE FUNCTION before_update_vivienda_propietario()
RETURNS TRIGGER AS $$
DECLARE
    old_total_percentage INT;
BEGIN
    -- Calcular el total actual menos el viejo porcentaje
    SELECT COALESCE(SUM(porcentaje_propiedad), 0) - OLD.porcentaje_propiedad INTO old_total_percentage
    FROM Vivienda_Propietario
    WHERE id_vivienda = OLD.id_vivienda;

    -- Llamar a la función para verificar el total del porcentaje
    PERFORM check_total_percentage(OLD.id_vivienda, old_total_percentage + NEW.porcentaje_propiedad);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_percentage_before_update
BEFORE UPDATE ON Vivienda_Propietario
FOR EACH ROW EXECUTE FUNCTION before_update_vivienda_propietario();

-- Agregar restricción CHECK para asegurar que el gobernador tenga id_tipo_documento igual a C.C
ALTER TABLE Persona
ADD CONSTRAINT chk_gobernador_tipo_documento CHECK (id_tipo_documento = 1);

-- Agregar restricción CHECK para asegurar que el cabeza de familia sea mayor de edad
ALTER TABLE Persona
ADD CONSTRAINT chk_cabeza_familia_mayor_de_edad CHECK (mayor_de_edad = TRUE);

-- Agregar la restricción para que un gobernador tenga en el municipio del departamento gobernado
CREATE OR REPLACE FUNCTION validate_gobernador_residence()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id_gobernador IS NOT NULL THEN
        SELECT d.id_departamento INTO NEW.id_departamento_gobernador
        FROM Persona p
        JOIN Vivienda v ON v.id_vivienda = p.id_recidencia
        JOIN Municipio m ON m.id_municipio = v.id_municipio
        JOIN Departamento d ON d.id_departamento = m.id_departamento
        WHERE p.id = NEW.id_gobernador;

        IF NEW.id_departamento <> NEW.id_departamento_gobernador THEN
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