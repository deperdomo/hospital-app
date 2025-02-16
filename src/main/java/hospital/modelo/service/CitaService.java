package hospital.modelo.service;

import java.util.List;

import hospital.entidades.Cita;
import hospital.entidades.Doctor;

public interface CitaService extends GenericCRUD<Cita, Integer>{

	List<Cita> buscarCitaPorUsuario (int id);
	List<Cita> buscarCitaPorDoctor (Doctor doctor);
	List<Cita> buscarCitasNoVistas (int idUsuario);
	
}
