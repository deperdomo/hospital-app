package hospital.modelo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hospital.entidades.Cita;

public interface CitaRepository extends JpaRepository<Cita, Integer>{

}
