package hospital.modelo.service;

import java.util.List;

import hospital.entidades.Usuario;

public interface UsuarioService extends GenericCRUD<Usuario, Integer> {

	List<Usuario> buscaPorRol(String rol);
	Usuario buscarPorUsername(String username); 
	
}
