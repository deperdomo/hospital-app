package hospital.modelo.service;

import java.util.List;

import hospital.entidades.Cita;

public interface CitaService extends GenericCRUD<Cita, Integer>{

	List<Cita> buscarCitaPorUsuario (int id);
	List<Cita> buscarCitaPorDoctor (int id);
	List<Cita> buscarCitasNoVistas (int idUsuario);
	
}
