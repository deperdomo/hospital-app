package hospital.modelo.service;

import java.util.List;

import hospital.entidades.Cita;
import hospital.entidades.Doctor;
import hospital.entidades.Usuario;

public interface CitaService extends GenericCRUD<Cita, Integer>{

	List<Cita> buscarCitasActivasPorUsuario (Usuario usuario, String estado);
	//terminada
	List<Cita> buscarCitasActivasPorUsuarioTerminada (Usuario usuario, String estado);
	//List<Cita> buscarCitasActivas();
	List<Cita> buscarCitaPorDoctor (Doctor doctor);
	List<Cita> buscarCitasNoVistas (int idUsuario);

	//mirar aqui es para historial
	//List<Cita> todasCitasHistorial(int idUsuario);

	
}

