package hospital.modelo.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import hospital.entidades.Cita;
import hospital.entidades.Doctor;
import hospital.entidades.Usuario;
import hospital.modelo.repository.CitaRepository;

@Service
public class CitaServiceImpl implements CitaService{
	
	@Autowired
	CitaRepository crepo;

	@Override
	public Cita alta(Cita entidad) {
		if (crepo.existsById(entidad.getId())) {
			return null;
		} else {
			return crepo.save(entidad);
		}
	}

	@Override
	public Cita modificar(Cita entidad) {
		try {
			if (crepo.existsById(entidad.getId())) {
				return crepo.save(entidad);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int eliminar(Cita entidad) {
		return eliminarPorId(entidad.getId());
	}

	@Override
	public int eliminarPorId(Integer id) {
		try {
			if (crepo.existsById(id)) {
				crepo.deleteById(id);
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
	public Cita buscarPorId(Integer id) {
		return crepo.findById(id).orElse(null);
	}

	@Override
	public List<Cita> buscarTodos() {
		return crepo.findAll();
	}

/*	@Override
	public List<Cita> buscarCitaPorUsuario(int id) {
		return crepo.findCitaByUsuario(id);
	}*/

	@Override
	public List<Cita> buscarCitasNoVistas(int idUsuario) {
		List<Cita> citasNoVistas = crepo.findByVisto(0);
		List<Cita> citasNoVistasDelUsuaario = new ArrayList<>();
		for (Cita cita : citasNoVistas) {
			if (cita.getUsuario().getId() == idUsuario) {
				citasNoVistasDelUsuaario.add(cita);
			}
		}
		return citasNoVistasDelUsuaario;
	}

	/*@Override
	public List<Cita> buscarCitasActivas() {
		return crepo.findByEstado("pendiente");
	}*/

	@Override
	public List<Cita> buscarCitasActivasPorUsuario(Usuario usuario, String estado) {
		return crepo.findByUsuarioAndEstado(usuario, "pendiente");
	}

	@Override
	public List<Cita> buscarCitaPorDoctor(Doctor doctor) {
		return crepo.findByDoctor(doctor);
	}

	
	
}