package hospital.modelo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hospital.entidades.Cita;
import hospital.entidades.Receta;
import hospital.modelo.repository.RecetaRepository;

@Service
public class RecetaServiceImpl implements RecetaService{

	@Autowired
	RecetaRepository rrepo;
	
	@Override
	public Receta alta(Receta entidad) {
		try {
			if (rrepo.existsById(entidad.getId())) {
				return null;
			} else {
				return rrepo.save(entidad);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Receta modificar(Receta entidad) {
		try {
			if (rrepo.existsById(entidad.getId())) {
				return rrepo.save(entidad);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int eliminar(Receta entidad) {
		return eliminarPorId(entidad.getId());
	}

	@Override
	public int eliminarPorId(Integer id) {
		try {
			if (rrepo.existsById(id)) {
				rrepo.deleteById(id);
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
	public Receta buscarPorId(Integer id) {
		return rrepo.findById(id).orElse(null);
	}

	@Override
	public List<Receta> buscarTodos() {
		return rrepo.findAll();
	}

	@Override
	public List<Receta> buscarRecetaCita(int idCita) {
		
		return rrepo.findByCitaReserva(idCita);
	}

}
