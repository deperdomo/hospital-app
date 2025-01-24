package hospital.modelo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import hospital.entidades.Especialidad;
import hospital.modelo.repository.EspecialidadRepository;

public class EspecialidadServiceImpl implements EspecialidadService {

	@Autowired
	EspecialidadRepository erepo;
		
	@Override
	public Especialidad alta(Especialidad entidad) {
		try {
			if (erepo.existsById(entidad.getId())) {
				return null;
			} else {
				return erepo.save(entidad);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Especialidad modificar(Especialidad entidad) {
		try {
			if (erepo.existsById(entidad.getId())) {
				return erepo.save(entidad);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int eliminar(Especialidad entidad) {
		return eliminarPorId(entidad.getId());
	}

	@Override
	public int eliminarPorId(Integer id) {
		try {
			if (erepo.existsById(id)) {
				erepo.deleteById(id);
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
	public Especialidad buscarPorId(Integer id) {
		return erepo.findById(id).orElse(null);
	}

	@Override
	public List<Especialidad> buscarTodos() {
		return erepo.findAll();
	}

}
