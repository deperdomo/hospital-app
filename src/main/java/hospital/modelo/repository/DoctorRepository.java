package hospital.modelo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import hospital.entidades.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer>{
	
	List<Doctor> findByLocalidadContains(String localidad);
	@Query("SELECT d FROM Doctor d WHERE " +
	           "LOWER(d.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) OR " +
	           "LOWER(d.apellidos) LIKE LOWER(CONCAT('%', :apellidos, '%')) OR " +
	           "LOWER(d.localidad) LIKE LOWER(CONCAT('%', :localidad, '%')) OR " +
	           "LOWER(d.especialidad.nombre) LIKE LOWER(CONCAT('%', :especialidad, '%'))")
	List<Doctor> findByNombreOrApellidosOrLocalidadOrEspecialidad(@Param("nombre") String nombre,
	                                                              @Param("apellidos") String apellidos,
	                                                              @Param("localidad") String localidad,
	                                                              @Param("especialidad") String especialidad);
	Doctor findByUsername(String username);
	
	
}


