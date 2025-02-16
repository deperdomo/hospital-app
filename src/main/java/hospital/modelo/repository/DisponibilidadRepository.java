package hospital.modelo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hospital.entidades.Disponibilidad;
import hospital.entidades.Doctor;

public interface DisponibilidadRepository extends JpaRepository<Disponibilidad, Integer> {

	Disponibilidad findByDoctor(Doctor doctor);
}
