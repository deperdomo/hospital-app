package hospital.modelo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hospital.entidades.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer>{
	
	List<Doctor> findByLocalidadContains(String localidad);
	
}
