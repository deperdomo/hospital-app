package hospital.modelo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hospital.entidades.Receta;

public interface RecetaRepository extends JpaRepository<Receta, Integer>{

}
