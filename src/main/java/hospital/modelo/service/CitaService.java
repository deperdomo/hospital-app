package hospital.modelo.service;

import java.util.Date;
import java.util.List;

import hospital.entidades.Cita;
import hospital.entidades.Doctor;
import hospital.entidades.Usuario;

public interface CitaService extends GenericCRUD<Cita, Integer>{

	List<Cita> buscarCitasActivasPorUsuario (Usuario usuario, String estado);
	List<Cita> buscarCitasCanceladasPorUsuario (Usuario usuario, String estado);
	List<Cita> buscarCitasActivasPorUsuarioTerminada (Usuario usuario, String estado);

	List<Cita> buscarCitaPorDoctor (Doctor doctor);
	List<Cita> buscarCitasPorDoctorYEstado (Doctor doctor, String estado);
	List<Cita> buscarCitasNoVistas (int idUsuario);
	List<Cita> buscarCitasPorUsuarioDoctorYEstado(Usuario usuario, Doctor doctor, String estado);
	
	List<Cita> buscarActuales(Usuario usuario, Date fecha);
	List<Cita> buscarProximas(Usuario usuario, Date fecha);
	List<Cita> buscarPasadas(Usuario usuario, Date fecha);
	
	//si falla aqui
	List<Cita> buscarCitasUsuario(int iUsuario);
	
}

