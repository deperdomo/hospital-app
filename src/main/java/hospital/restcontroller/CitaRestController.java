package hospital.restcontroller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hospital.entidades.Cita;

import hospital.entidades.Doctor;
import hospital.entidades.Usuario;

import hospital.modelo.service.CitaService;
import hospital.modelo.service.DoctorService;
import hospital.modelo.service.UsuarioService;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin(origins="*")
@RequestMapping("/cita")
public class CitaRestController {

	@Autowired
	private CitaService cserv;
	

	@Autowired
	private UsuarioService userv;
	
	@Autowired
	private DoctorService dserv;
	
	@GetMapping("/citasDoctor/{id}")
	public ResponseEntity<?> buscarCitasDoctor(@PathVariable int id) {
		Doctor doctor = dserv.buscarPorId(id);

		if (doctor != null) {
			return new ResponseEntity<>(cserv.buscarCitaPorDoctor(doctor), HttpStatus.OK);
		}
		return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/doctorEstado/{id}/{estado}")
	public ResponseEntity<?> buscarCitaDoctor(@PathVariable int id, @PathVariable String estado) {
		Doctor doctor = dserv.buscarPorId(id);
		if (doctor != null) {
			return new ResponseEntity<>(cserv.buscarCitasPorDoctorYEstado(doctor, estado), HttpStatus.OK);
		}
		return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	

	@GetMapping("/misCitasUsuario/{id}")
	public ResponseEntity<?> buscarCitasActivasUsuario(@PathVariable int id){
		Usuario usuario = userv.buscarPorId(id);
		if (usuario != null) {
			
			return new ResponseEntity<>(cserv.buscarCitasActivasPorUsuario(userv.buscarPorId(id), "pendiente"), HttpStatus.OK);
		}
		 return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/misCitasUsuarioTerminado/{id}")
	public ResponseEntity<?> buscarCitasTerminadoUsuario(@PathVariable int id){
		Usuario usuario = userv.buscarPorId(id);
		if (usuario != null) {
			
			return new ResponseEntity<>(cserv.buscarCitasActivasPorUsuarioTerminada(userv.buscarPorId(id), "terminada"), HttpStatus.OK);
		}
		 return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/misCitasCanceladasUsuario/{id}")
	public ResponseEntity<?> buscarCitasCanceladasUsuario(@PathVariable int id){
		Usuario usuario = userv.buscarPorId(id);
		if (usuario != null) {
			
			return new ResponseEntity<>(cserv.buscarCitasCanceladasPorUsuario(userv.buscarPorId(id), "cancelada"), HttpStatus.OK);
		}
		 return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/alta")
	public ResponseEntity<?> alta(@RequestBody Cita cita) {
	    try {
	    	Cita nuevaCita = cserv.alta(cita);
	        return new ResponseEntity<>(nuevaCita, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error en el registro", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@GetMapping("/citasNoVistas/{id}")
	public ResponseEntity<?> buscarCitasNoVistas(@PathVariable int id) {
		Usuario usuario = userv.buscarPorId(id);
		if (usuario != null) {
			return new ResponseEntity<>(cserv.buscarCitasNoVistas(id), HttpStatus.OK);
		}
		return new ResponseEntity<>("Ha ocurrido un error ", HttpStatus.NOT_FOUND);
	}

	@PutMapping("/cancelar/{id}")
	public ResponseEntity<?> cancelarCita(@PathVariable int id){
		Cita cita = cserv.buscarPorId(id);
		cita.setEstado("cancelada");
		cserv.modificar(cita);
		return new ResponseEntity<>(cita, HttpStatus.OK);

	}
	
	@PutMapping("/marcarComoVista/{id}")
	public ResponseEntity<?> marcarCitaComoVista(@PathVariable int id){
		Cita cita = cserv.buscarPorId(id);
		cita.setVisto(1);
		cserv.modificar(cita);
		return new ResponseEntity<>(cita, HttpStatus.OK);
		
	}
	
	@GetMapping("/usuarioDoctorEstado/{idUsuario}/{idDoctor}/{estado}")
	public ResponseEntity<?> buscarCitasUsuarioDocrotEstado(@PathVariable int idUsuario, @PathVariable int idDoctor, @PathVariable String estado){
		Usuario usuario = userv.buscarPorId(idUsuario);
		Doctor doctor = dserv.buscarPorId(idDoctor);
		if (usuario != null && doctor != null) {
			
			return new ResponseEntity<>(cserv.buscarCitasPorUsuarioDoctorYEstado(usuario, doctor, estado), HttpStatus.OK);
		}
		 return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	
	// LA {fecha} SIEMPRE SERÁ LA FECHA ACTUAL EN FORMATO '2023-06-10'
	@GetMapping("/actuales/{id}/{fecha}") // http://localhost:8090/cita/actuales/3/2023-06-10
    public ResponseEntity<?> buscarCitasActuales(@PathVariable int id, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
        Usuario usuario = userv.buscarPorId(id);
		if (fecha != null && usuario != null) {
            List<Cita> citas = cserv.buscarActuales(usuario, fecha);
            return new ResponseEntity<>(citas, HttpStatus.OK);
        }
        return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
    }
	
	@GetMapping("/pasadas/{id}/{fecha}") // http://localhost:8090/cita/pasadas/3/2023-06-10
    public ResponseEntity<?> buscarCitasPasadas(@PathVariable int id, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
        Usuario usuario = userv.buscarPorId(id);
		if (fecha != null && usuario != null) {
            List<Cita> citas = cserv.buscarPasadas(usuario, fecha);
            return new ResponseEntity<>(citas, HttpStatus.OK);
        }
        return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
    }
	
	@GetMapping("/proximas/{id}/{fecha}") // http://localhost:8090/cita/proximas/3/2023-06-10
    public ResponseEntity<?> buscarCitasProximas(@PathVariable int id, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
        Usuario usuario = userv.buscarPorId(id);
		if (fecha != null && usuario != null) {
            List<Cita> citas = cserv.buscarProximas(usuario, fecha);
            return new ResponseEntity<>(citas, HttpStatus.OK);
        }
        return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
    }

	@GetMapping("/todasCitasUsuario/{idUsuario}")
	public ResponseEntity<?> buscarTodasCitasUsaurio(@PathVariable int idUsuario) {
		Usuario usuario = userv.buscarPorId(idUsuario);	
		if (usuario!= null) {
			List<Cita> citas=cserv.buscarCitasUsuario(idUsuario);
			return new ResponseEntity<>(citas, HttpStatus.OK);
		}
		 return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
		}
	
	@PutMapping("/actualizarTerminada/{id}")
	public ResponseEntity<?> actualizarCita(@PathVariable int id){
		Cita cita = cserv.buscarPorId(id);
		cita.setEstado("terminada");
		cserv.modificar(cita);
		return new ResponseEntity<>(cita, HttpStatus.OK);
	}
	
	@PutMapping("/marcarComoVotada/{idCita}")
	public ResponseEntity<?> cambiarAVotada(@PathVariable int idCita){
		Cita cita = cserv.buscarPorId(idCita);
		if (cita != null) {
			cita.setVotado(true);
			if (cserv.modificar(cita) != null) {
				return new ResponseEntity<>(cita, HttpStatus.OK);
			}
		}
		return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	
	//historial Doctor
	@GetMapping("/actualesDoctor/{id}/{fecha}") // http://localhost:8090/cita/actuales/3/2023-06-10
    public ResponseEntity<?> buscarCitasActualesDoctor(@PathVariable int id, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
        Doctor doctor = dserv.buscarPorId(id);
		if (fecha != null && doctor != null) {
            List<Cita> citas = cserv.buscarActualesDoctor(doctor,fecha);
            return new ResponseEntity<>(citas, HttpStatus.OK);
        }
        return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
    }
	
	@GetMapping("/pasadasDoctor/{id}/{fecha}") // http://localhost:8090/cita/pasadas/3/2023-06-10
    public ResponseEntity<?> buscarCitasPasadasDoctor(@PathVariable int id, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
		Doctor doctor = dserv.buscarPorId(id);
		if (fecha != null && doctor != null) {
            List<Cita> citas = cserv.buscarPasadasDoctor(doctor, fecha);
            return new ResponseEntity<>(citas, HttpStatus.OK);
        }
        return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
    }
	
	@GetMapping("/proximasDoctor/{id}/{fecha}") // http://localhost:8090/cita/proximas/3/2023-06-10
    public ResponseEntity<?> buscarCitasProximasDoctor(@PathVariable int id, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
		Doctor doctor = dserv.buscarPorId(id);
		if (fecha != null && doctor != null) {
            List<Cita> citas = cserv.buscarProximasDoctor(doctor, fecha);
            return new ResponseEntity<>(citas, HttpStatus.OK);
        }
        return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
    }
	
	@GetMapping("/buscarCita/{id}")
	public ResponseEntity<?> buscarUnaCita(@PathVariable int id) {
		Cita cita =cserv.buscarPorId(id);
		if (cita!=null) {
			 return new ResponseEntity<>(cita, HttpStatus.OK);
		}
		return new ResponseEntity<>("No se encontro la cita", HttpStatus.NOT_FOUND);
	}
	
	
}
