package hospital.restcontroller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
import hospital.seguridad.Acceso;

@RestController
@RequestMapping("/cita")
public class CitaRestController {

	@Autowired
	private CitaService cserv;
	@Autowired
	private UsuarioService userv;
	@Autowired
	private DoctorService dserv;
	@Autowired
	private Acceso acceso;

	private static final ResponseEntity<?> ERROR = new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);

	// ---------- citas de un doctor ----------

	@GetMapping("/citasDoctor/{id}")
	public ResponseEntity<?> buscarCitasDoctor(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		acceso.propioDoctor(jwt, id);
		Doctor doctor = dserv.buscarPorId(id);
		return doctor != null ? ResponseEntity.ok(cserv.buscarCitaPorDoctor(doctor)) : ERROR;
	}

	@GetMapping("/doctorEstado/{id}/{estado}")
	public ResponseEntity<?> buscarCitaDoctor(@PathVariable int id, @PathVariable String estado,
			@AuthenticationPrincipal Jwt jwt) {
		Doctor doctor = dserv.buscarPorId(id);
		if (doctor == null) return ERROR;
		List<Cita> citas = cserv.buscarCitasPorDoctorYEstado(doctor, estado);
		if (Acceso.admin(jwt) || (Acceso.doctor(jwt) && Acceso.id(jwt) == id)) {
			return ResponseEntity.ok(citas);
		}
		// El calendario de reserva de un paciente solo necesita las horas ocupadas,
		// no los datos de los otros pacientes.
		return ResponseEntity.ok(citas.stream().map(c -> Map.of("id", c.getId(), "fecha", c.getFecha())).toList());
	}

	@GetMapping("/actualesDoctor/{id}/{fecha}")
	public ResponseEntity<?> buscarCitasActualesDoctor(@PathVariable int id,
			@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha, @AuthenticationPrincipal Jwt jwt) {
		acceso.propioDoctor(jwt, id);
		Doctor doctor = dserv.buscarPorId(id);
		return doctor != null ? ResponseEntity.ok(cserv.buscarActualesDoctor(doctor, fecha)) : ERROR;
	}

	@GetMapping("/pasadasDoctor/{id}/{fecha}")
	public ResponseEntity<?> buscarCitasPasadasDoctor(@PathVariable int id,
			@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha, @AuthenticationPrincipal Jwt jwt) {
		acceso.propioDoctor(jwt, id);
		Doctor doctor = dserv.buscarPorId(id);
		return doctor != null ? ResponseEntity.ok(cserv.buscarPasadasDoctor(doctor, fecha)) : ERROR;
	}

	@GetMapping("/proximasDoctor/{id}/{fecha}")
	public ResponseEntity<?> buscarCitasProximasDoctor(@PathVariable int id,
			@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha, @AuthenticationPrincipal Jwt jwt) {
		acceso.propioDoctor(jwt, id);
		Doctor doctor = dserv.buscarPorId(id);
		return doctor != null ? ResponseEntity.ok(cserv.buscarProximasDoctor(doctor, fecha)) : ERROR;
	}

	// ---------- citas de un paciente ----------

	@GetMapping("/misCitasUsuario/{id}")
	public ResponseEntity<?> buscarCitasActivasUsuario(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		acceso.verUsuario(jwt, id);
		Usuario usuario = userv.buscarPorId(id);
		return usuario != null ? ResponseEntity.ok(cserv.buscarCitasActivasPorUsuario(usuario, "pendiente")) : ERROR;
	}

	@GetMapping("/misCitasUsuarioTerminado/{id}")
	public ResponseEntity<?> buscarCitasTerminadoUsuario(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		acceso.verUsuario(jwt, id);
		Usuario usuario = userv.buscarPorId(id);
		return usuario != null ? ResponseEntity.ok(cserv.buscarCitasActivasPorUsuarioTerminada(usuario, "terminada")) : ERROR;
	}

	@GetMapping("/misCitasCanceladasUsuario/{id}")
	public ResponseEntity<?> buscarCitasCanceladasUsuario(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		acceso.verUsuario(jwt, id);
		Usuario usuario = userv.buscarPorId(id);
		return usuario != null ? ResponseEntity.ok(cserv.buscarCitasCanceladasPorUsuario(usuario, "cancelada")) : ERROR;
	}

	@GetMapping("/citasNoVistas/{id}")
	public ResponseEntity<?> buscarCitasNoVistas(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		acceso.verUsuario(jwt, id);
		return userv.buscarPorId(id) != null ? ResponseEntity.ok(cserv.buscarCitasNoVistas(id)) : ERROR;
	}

	@GetMapping("/usuarioDoctorEstado/{idUsuario}/{idDoctor}/{estado}")
	public ResponseEntity<?> buscarCitasUsuarioDoctorEstado(@PathVariable int idUsuario, @PathVariable int idDoctor,
			@PathVariable String estado, @AuthenticationPrincipal Jwt jwt) {
		acceso.verUsuario(jwt, idUsuario);
		Usuario usuario = userv.buscarPorId(idUsuario);
		Doctor doctor = dserv.buscarPorId(idDoctor);
		if (usuario != null && doctor != null) {
			return ResponseEntity.ok(cserv.buscarCitasPorUsuarioDoctorYEstado(usuario, doctor, estado));
		}
		return ERROR;
	}

	// LA {fecha} SIEMPRE SERÁ LA FECHA ACTUAL EN FORMATO '2023-06-10'
	@GetMapping("/actuales/{id}/{fecha}")
	public ResponseEntity<?> buscarCitasActuales(@PathVariable int id,
			@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha, @AuthenticationPrincipal Jwt jwt) {
		acceso.verUsuario(jwt, id);
		Usuario usuario = userv.buscarPorId(id);
		return usuario != null ? ResponseEntity.ok(cserv.buscarActuales(usuario, fecha)) : ERROR;
	}

	@GetMapping("/pasadas/{id}/{fecha}")
	public ResponseEntity<?> buscarCitasPasadas(@PathVariable int id,
			@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha, @AuthenticationPrincipal Jwt jwt) {
		acceso.verUsuario(jwt, id);
		Usuario usuario = userv.buscarPorId(id);
		return usuario != null ? ResponseEntity.ok(cserv.buscarPasadas(usuario, fecha)) : ERROR;
	}

	@GetMapping("/proximas/{id}/{fecha}")
	public ResponseEntity<?> buscarCitasProximas(@PathVariable int id,
			@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha, @AuthenticationPrincipal Jwt jwt) {
		acceso.verUsuario(jwt, id);
		Usuario usuario = userv.buscarPorId(id);
		return usuario != null ? ResponseEntity.ok(cserv.buscarProximas(usuario, fecha)) : ERROR;
	}

	@GetMapping("/todasCitasUsuario/{idUsuario}")
	public ResponseEntity<?> buscarTodasCitasUsuario(@PathVariable int idUsuario, @AuthenticationPrincipal Jwt jwt) {
		acceso.verUsuario(jwt, idUsuario);
		return userv.buscarPorId(idUsuario) != null ? ResponseEntity.ok(cserv.buscarCitasUsuario(idUsuario)) : ERROR;
	}

	// ---------- operaciones sobre una cita ----------

	@PostMapping("/alta")
	public ResponseEntity<?> alta(@RequestBody Cita cita, @AuthenticationPrincipal Jwt jwt) {
		acceso.propioUsuario(jwt, cita.getUsuario() == null ? -1 : cita.getUsuario().getId());
		cita.setId(0);
		try {
			return ResponseEntity.ok(cserv.alta(cita));
		} catch (Exception e) {
			return new ResponseEntity<>("Error en el registro", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/buscarCita/{id}")
	public ResponseEntity<?> buscarUnaCita(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		Cita cita = cserv.buscarPorId(id);
		acceso.cita(jwt, cita);
		return ResponseEntity.ok(cita);
	}

	@PutMapping("/cancelar/{id}")
	public ResponseEntity<?> cancelarCita(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		return cambiar(id, jwt, c -> c.setEstado("cancelada"));
	}

	@PutMapping("/marcarComoVista/{id}")
	public ResponseEntity<?> marcarCitaComoVista(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		return cambiar(id, jwt, c -> c.setVisto(1));
	}

	@PutMapping("/actualizarTerminada/{id}")
	public ResponseEntity<?> actualizarCita(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		return cambiar(id, jwt, c -> c.setEstado("terminada"));
	}

	@PutMapping("/marcarComoVotada/{idCita}")
	public ResponseEntity<?> cambiarAVotada(@PathVariable int idCita, @AuthenticationPrincipal Jwt jwt) {
		return cambiar(idCita, jwt, c -> c.setVotado(true));
	}

	private ResponseEntity<?> cambiar(int id, Jwt jwt, java.util.function.Consumer<Cita> cambio) {
		Cita cita = cserv.buscarPorId(id);
		acceso.cita(jwt, cita);
		cambio.accept(cita);
		return cserv.modificar(cita) != null ? ResponseEntity.ok(cita) : ERROR;
	}
}
