package hospital.modelo.service;



import java.util.ArrayList;
import java.util.Date;
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


	@Override
	public List<Cita> buscarCitasActivasPorUsuario(Usuario usuario, String estado) {
		return crepo.findByUsuarioAndEstado(usuario, "pendiente");
	}

	
	@Override
	public List<Cita> buscarCitasCanceladasPorUsuario(Usuario usuario, String estado) {
		return crepo.findByUsuarioAndEstado(usuario, "cancelada");
	}


	@Override
	public List<Cita> buscarCitaPorDoctor(Doctor doctor) {
		return crepo.findByDoctor(doctor);
	}


	@Override
	public List<Cita> buscarCitasActivasPorUsuarioTerminada(Usuario usuario, String estado) {
		
		return crepo.findByUsuarioAndEstado(usuario, "terminada");
	}

	@Override
	public List<Cita> buscarCitasPorUsuarioDoctorYEstado(Usuario usuario, Doctor doctor, String estado) {
		return crepo.findByUsuarioAndDoctorAndEstado(usuario, doctor, estado);
	}

	@Override
	public List<Cita> buscarCitasPorDoctorYEstado(Doctor doctor, String estado) {
		return crepo.findByDoctorAndEstado(doctor, estado);
	}
	
	@Override
		public List<Cita> buscarActuales(Usuario usuario, Date fecha) {
			return crepo.findByUsuarioAndFechaEquals(usuario, fecha);
	}
	
	@Override
	public List<Cita> buscarPasadas(Usuario usuario, Date fecha) {
		return crepo.findByFechaPasadas(usuario, fecha);
	}

	@Override
	public List<Cita> buscarProximas(Usuario usuario, Date fecha) {
		return crepo.findByFechaGreaterThan(usuario, fecha);
	}
//si falla aqui
	@Override
	public List<Cita> buscarCitasUsuario(int idUsuario) {
		
		return crepo.todasCitasUsuario(idUsuario);
	}
// historial doctor
	@Override
	public List<Cita> buscarPasadasDoctor(Doctor doctor, Date fecha) {
		
		return crepo.findByFechaPasadasDoctor(doctor, fecha);
	}

	@Override
	public List<Cita> buscarActualesDoctor(Doctor doctor, Date fecha) {
		
		return crepo.findByDoctorAndFechaEquals(doctor, fecha);
	}

	@Override
	public List<Cita> buscarProximasDoctor(Doctor doctor, Date fecha) {
		
		return crepo.findByFechaDoctorGreaterThan(doctor, fecha);
	}

	
	
	
}