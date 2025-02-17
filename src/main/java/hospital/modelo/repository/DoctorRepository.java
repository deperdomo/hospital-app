package hospital.modelo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import hospital.entidades.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer>{
	
	List<Doctor> findByLocalidadContains(String localidad);
	@Query("SELECT d FROM Doctor d WHERE (:nombre IS NULL OR d.nombre = :nombre) AND (:apellidos IS NULL OR d.apellidos = :apellidos) AND (:localidad IS NULL OR d.localidad = :localidad)")
    List<Doctor> findByNombreAndApellidosAndLocalidad(@Param("nombre") String nombre, @Param("apellidos") String apellidos, @Param("localidad") String localidad);
	
}
