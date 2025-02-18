package hospital.modelo.service;

import java.util.List;

import hospital.entidades.Doctor;

public interface DoctorService extends GenericCRUD<Doctor, Integer>{

	List<Doctor> buscarPorNombreApellidoLocalidadYEspecialidad(String nombre, String apellido, String localidad, String especialidad);
	List<Doctor> buscarPorLocalidad(String localidad);
	
}
