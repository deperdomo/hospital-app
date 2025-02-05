package hospital.modelo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import hospital.entidades.Usuario;
import hospital.modelo.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	UsuarioRepository urepo;
	
	@Override
	public Usuario alta(Usuario entidad) {
		if (urepo.existsById(entidad.getId())) {
			return null;
		} else {
			return urepo.save(entidad);
		}
		
	}

	@Override
	public Usuario modificar(Usuario entidad) {
		try {
			if (urepo.existsById(entidad.getId())) {
				return urepo.save(entidad);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int eliminar(Usuario entidad) {
		return eliminarPorId(entidad.getId());
	}

	@Override
	public int eliminarPorId(Integer id) {
		try {
			if (urepo.existsById(id)) {
				urepo.deleteById(id);
				return 1;
			} else {
				return 0;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	@Override
	public Usuario buscarPorId(Integer id) {
		return urepo.findById(id).orElse(null);
	}

	@Override
	public List<Usuario> buscarTodos() {
		return urepo.findAll();
	}

	@Override
	public List<Usuario> buscaPorRol(String rol) {
		return urepo.findByRol(rol);
	}

	@Override
	public Usuario buscarPorUsername(String username) {
		return urepo.findByUsername(username);
	}

	
}
