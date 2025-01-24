package hospital.modelo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hospital.entidades.Disponibilidad;
import hospital.modelo.repository.DisponibilidadRepository;

@Service
public class DisponibilidadServiceImpl implements DisponibilidadService{

	@Autowired
	DisponibilidadRepository drepo;
	
	@Override
	public Disponibilidad alta(Disponibilidad entidad) {
		try {
			if (drepo.existsById(entidad.getId())) {
				return null;
			} else {
				return drepo.save(entidad);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Disponibilidad modificar(Disponibilidad entidad) {
		try {
			if (drepo.existsById(entidad.getId())) {
				return drepo.save(entidad);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int eliminar(Disponibilidad entidad) {
		return eliminarPorId(entidad.getId());
	}

	@Override
	public int eliminarPorId(Integer id) {
		try {
			if (drepo.existsById(id)) {
				drepo.deleteById(id);
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
	public Disponibilidad buscarPorId(Integer id) {
		return drepo.findById(id).orElse(null);
	}

	@Override
	public List<Disponibilidad> buscarTodos() {
		return drepo.findAll();
	}

}
