package hospital.modelo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hospital.entidades.Factura;
import hospital.modelo.repository.FacturaRepository;

@Service
public class FacturaServiceImpl implements FacturaService {

	@Autowired
	FacturaRepository frepo;
	
	@Override
	public Factura alta(Factura entidad) {
		try {
			if (frepo.existsById(entidad.getId())) {
				return null;
			} else {
				return frepo.save(entidad);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Factura modificar(Factura entidad) {
		try {
			if (frepo.existsById(entidad.getId())) {
				return frepo.save(entidad);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int eliminar(Factura entidad) {
		return eliminarPorId(entidad.getId());
	}

	@Override
	public int eliminarPorId(Integer id) {
		try {
			if (frepo.existsById(id)) {
				frepo.deleteById(id);
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
	public Factura buscarPorId(Integer id) {
		return frepo.findById(id).orElse(null);
	}

	@Override
	public List<Factura> buscarTodos() {
		return frepo.findAll();
	}

}
