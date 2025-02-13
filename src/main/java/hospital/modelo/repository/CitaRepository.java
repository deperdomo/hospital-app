package hospital.modelo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import hospital.entidades.Cita;

public interface CitaRepository extends JpaRepository<Cita, Integer>{
	
	@Query("select c from Cita c where c.usuario.id = ?1")
	List<Cita> findCitaByUsuario (int id);
	
	@Query("select c from Cita c where c.doctor.id = ?1")
	List<Cita> findCitaByDoctor (int id);
}
