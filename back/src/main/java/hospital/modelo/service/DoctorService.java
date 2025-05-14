package hospital.modelo.service;

import java.util.List;

import hospital.entidades.Doctor;
import hospital.entidades.Especialidad;

public interface DoctorService extends GenericCRUD<Doctor, Integer>{

	List<Doctor> buscarPorNombreApellidoLocalidadYEspecialidad(String nombre, String apellido, String localidad, String especialidad);
	List<Doctor> buscarPorLocalidad(String localidad);
	Doctor buscarPorUsername(String username);
	//buscar doctores por la especialidad
	//List<Doctor> buscarDoctorPorEspecialidad(int idEspecialidad);
	//List<Doctor> buscarDoctorCardiologia(int idEspecialidad);
}
