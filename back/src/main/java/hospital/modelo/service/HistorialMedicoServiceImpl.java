package hospital.modelo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hospital.entidades.HistorialMedico;
import hospital.modelo.repository.HistorialMedicoRepository;

@Service
public class HistorialMedicoServiceImpl implements HistorialMedicoService {

	@Autowired
	HistorialMedicoRepository hrepo;
	
	@Override
	public HistorialMedico alta(HistorialMedico entidad) {
		try {
			if (hrepo.existsById(entidad.getId())) {
				return null;
			} else {
				return hrepo.save(entidad);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public HistorialMedico modificar(HistorialMedico entidad) {
		try {
			if (hrepo.existsById(entidad.getId())) {
				return hrepo.save(entidad);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int eliminar(HistorialMedico entidad) {
		return eliminarPorId(entidad.getId());
	}

	@Override
	public int eliminarPorId(Integer id) {
		try {
			if (hrepo.existsById(id)) {
				hrepo.deleteById(id);
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
	public HistorialMedico buscarPorId(Integer id) {
		return hrepo.findById(id).orElse(null);
	}

	@Override
	public List<HistorialMedico> buscarTodos() {
		return hrepo.findAll();
	}

}
