package hospital.modelo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import hospital.entidades.Cita;
import hospital.entidades.Receta;

public interface RecetaRepository extends JpaRepository<Receta, Integer>{

	@Query("select r from Receta r where r.cita.id=?1")
	List<Receta> findByCitaReserva(int idCita);
}
