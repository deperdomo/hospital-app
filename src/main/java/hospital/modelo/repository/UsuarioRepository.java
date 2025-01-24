package hospital.modelo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hospital.entidades.Usuario;
import java.util.List;


public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
	
	List<Usuario> findByRol(String rol);
	
}
