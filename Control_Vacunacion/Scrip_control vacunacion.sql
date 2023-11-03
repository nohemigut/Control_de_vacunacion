USE control_vacunacion;

CREATE TABLE VACUNAS(idVacuna INT NOT NULL AUTO_INCREMENT,
					nombre VARCHAR(45) NOT NULL,
                    cantidad_dosis INT NOT NULL,
                    PRIMARY KEY (idVacuna));
                      
CREATE TABLE EMPLEADO(idEmpleado INT NOT NULL AUTO_INCREMENT,
					  nombre VARCHAR(45) NOT NULL,
                      idVacuna INT NOT NULL,
                      puesto_laboral VARCHAR(45) NOT NULL,
                      estado_vacunacion VARCHAR(45) NOT NULL,
                      fecha_primera_dosis DATE NOT NULL,
                      PRIMARY KEY (idEmpleado),
                      FOREIGN KEY (idVacuna) REFERENCES VACUNAS(idVacuna));

DELETE FROM VACUNAS WHERE idVacuna="7";
ALTER TABLE VACUNAS AUTO_INCREMENT=1;
drop table EMPLEADO;
Select *from EMPLEADO;
Select *from VACUNAS;

INSERT INTO VACUNAS (nombre, cantidad_dosis)VALUES
('Sinopharm','2'),
('AstraZeneca','2'),
('Sputnik V','2'),
('Pfizer','2'),
('Moderna','2'),
('Janssen','1');
