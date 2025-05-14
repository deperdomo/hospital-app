package hospital.modelo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hospital.entidades.Especialidad;

public interface EspecialidadRepository extends JpaRepository<Especialidad, Integer> {

}
