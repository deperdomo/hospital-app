package hospital.modelo.service;

import hospital.entidades.Disponibilidad;
import hospital.entidades.Doctor;

public interface DisponibilidadService extends GenericCRUD<Disponibilidad, Integer> {
	
	Disponibilidad buscarPorDoctor(Doctor doctor);
	
}
