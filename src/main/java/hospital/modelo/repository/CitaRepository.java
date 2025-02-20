package hospital.modelo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import hospital.entidades.Cita;
import hospital.entidades.Doctor;
import hospital.entidades.Usuario;

public interface CitaRepository extends JpaRepository<Cita, Integer>{
	
	//@Query("select c from Cita c where c.usuario.id = ?1")
	//List<Cita> todasCitasUsuario (int idUsaurio);
	//
	
	//List<Cita> findByEstado (String estado);
	List<Cita> findByUsuarioAndEstado (Usuario usuario, String estado);

	List<Cita> findByDoctorAndEstado (Doctor doctor, String estado);
	
	List<Cita> findByVisto(int visto);
//sarcar datos de sita, usuario y doctor
	//select c.fecha, d.nombre, d.apellidos, u.nombre from citas c join usuarios u  on u.id= c.id_usuario join doctores d on d.id=c.id_doctor where u.id=3;
	
	
}
