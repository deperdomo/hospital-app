package hospital.modelo.repository;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import hospital.entidades.Cita;
import hospital.entidades.Doctor;
import hospital.entidades.Usuario;

public interface CitaRepository extends JpaRepository<Cita, Integer>{
	
	@Query("select c from Cita c where c.usuario.id = ?1")
	List<Cita> todasCitasUsuario (int idUsaurio);

	List<Cita> findByUsuarioAndEstado (Usuario usuario, String estado);
	
	List<Cita> findByDoctor (Doctor doctor);
	List<Cita> findByDoctorAndEstado (Doctor doctor, String estado);
	
	List<Cita> findByVisto(int visto);

	List<Cita> findByUsuarioAndDoctorAndEstado(Usuario usuario, Doctor doctor, String estado);

	
	
	@Query("SELECT c FROM Cita c WHERE c.usuario = ?1 and DATE(c.fecha) = ?2")
	List<Cita> findByUsuarioAndFechaEquals(Usuario usuario, Date fecha);
	
	@Query("SELECT c FROM Cita c WHERE c.usuario = ?1 AND DATE(c.fecha) = ?2")
	List<Cita> findByFechaPasadas(Usuario usuario, Date fecha);

	@Query("SELECT c FROM Cita c WHERE c.usuario = ?1 AND DATE(c.fecha) > ?2")
	List<Cita> findByFechaGreaterThan(Usuario usuario, Date fecha);

	
	
}
