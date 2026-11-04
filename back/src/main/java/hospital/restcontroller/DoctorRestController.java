package hospital.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hospital.entidades.Doctor;
import hospital.modelo.repository.CitaRepository;
import hospital.modelo.service.DoctorService;
import hospital.restcontroller.UsuarioRestController.CambioPassword;
import hospital.seguridad.Acceso;

@RestController
@RequestMapping("/doctor")
public class DoctorRestController {

	@Autowired
	private DoctorService dserv;
	@Autowired
	private CitaRepository crepo;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private Acceso acceso;

	/** Solo rol=admin (ver SecurityConfig). */
	@PostMapping("/alta")
	public ResponseEntity<?> alta(@RequestBody Doctor doctor) {
		if (doctor.getPassword() == null || doctor.getPassword().isBlank()) {
			return new ResponseEntity<>("La contraseña es obligatoria", HttpStatus.BAD_REQUEST);
		}
		doctor.setId(0);
		doctor.setPassword(encoder.encode(doctor.getPassword()));
		try {
			return new ResponseEntity<>(dserv.alta(doctor), HttpStatus.OK);
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<>("El correo electrónico o el nombre de doctor ya están en uso", HttpStatus.CONFLICT);
		} catch (Exception e) {
			return new ResponseEntity<>("Error en el registro", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("recomendado/{cantidad}")
	public ResponseEntity<?> getMedicos(@PathVariable int cantidad) {
		if (cantidad < 1) {
			return new ResponseEntity<>(List.of(), HttpStatus.OK);
		}
		// endpoint público: tope para que nadie pida la tabla entera
		List<Doctor> medicos = dserv.buscarRecomendados(Math.min(cantidad, 50));
		if (medicos.isEmpty()) {
			return new ResponseEntity<>("No hay medicos", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(medicos, HttpStatus.OK);
	}

	@GetMapping("one/{id}")
	public ResponseEntity<?> getMedicoById(@PathVariable int id) {
		Doctor doctor = dserv.buscarPorId(id);
		if (doctor != null) {
			return new ResponseEntity<>(doctor, HttpStatus.OK);
		}
		return new ResponseEntity<>("Ese medico no existe", HttpStatus.NOT_FOUND);
	}

	@GetMapping("/allDoctors")
	public ResponseEntity<?> todos() {
		List<Doctor> doctores = dserv.buscarTodos();
		if (doctores.isEmpty()) {
			return new ResponseEntity<>("No se encontraron doctores.", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(doctores, HttpStatus.OK);
	}

	@GetMapping("/porNombreApellidoLocalidadYEspecialidad/{nombre}/{apellidos}/{localidad}/{especialidad}")
	public ResponseEntity<?> buscarPorNombreApellidoLocalidadYEspecialidad(@PathVariable String nombre,
			@PathVariable String apellidos, @PathVariable String localidad, @PathVariable String especialidad) {
		List<Doctor> doctores = dserv.buscarPorNombreApellidoLocalidadYEspecialidad(nombre, apellidos, localidad, especialidad);
		if (doctores.isEmpty()) {
			return new ResponseEntity<>("No se encontraron doctores", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(doctores, HttpStatus.OK);
	}

	@GetMapping("/localidad/{localidad}")
	public ResponseEntity<?> porLocalidad(@PathVariable String localidad) {
		List<Doctor> doctores = dserv.buscarPorLocalidad(localidad);
		if (doctores.isEmpty()) {
			return new ResponseEntity<>("No se encontraron doctores.", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(doctores, HttpStatus.OK);
	}

	@PutMapping("/votar/{idDoctor}/{valoracion}")
	public ResponseEntity<?> votarDoctor(@PathVariable int idDoctor, @PathVariable boolean valoracion,
			@AuthenticationPrincipal Jwt jwt) {
		// ponytail: solo pacientes con alguna cita con el doctor; no evita votos repetidos
		// (el front marca la cita como votada). Atar el voto a la cita si hace falta.
		if (!Acceso.paciente(jwt) || !crepo.existsByUsuario_IdAndDoctor_Id(Acceso.id(jwt), idDoctor)) {
			throw Acceso.prohibido();
		}
		Doctor doctor = dserv.buscarPorId(idDoctor);
		if (doctor == null) {
			return new ResponseEntity<>("No se encontró el doctor", HttpStatus.NOT_FOUND);
		}
		doctor.setVotos(doctor.getVotos() + (valoracion ? 1 : -1));
		if (dserv.modificar(doctor) != null) {
			return new ResponseEntity<>(doctor, HttpStatus.OK);
		}
		return new ResponseEntity<>("No se pudo modificar el doctor", HttpStatus.NOT_FOUND);
	}

	@PutMapping("/editar")
	public ResponseEntity<?> editarDoctor(@RequestBody Doctor doctor, @AuthenticationPrincipal Jwt jwt) {
		acceso.propioDoctor(jwt, doctor.getId());
		Doctor actual = dserv.buscarPorId(doctor.getId());
		if (actual == null) {
			return new ResponseEntity<>("Doctor a editar no encontrado", HttpStatus.NOT_FOUND);
		}
		// contraseña y votos no se cambian desde aquí
		doctor.setPassword(actual.getPassword());
		doctor.setVotos(actual.getVotos());
		if (dserv.modificar(doctor) != null) {
			return new ResponseEntity<>(doctor, HttpStatus.OK);
		}
		return new ResponseEntity<>("Ha ocurrido un error al editar", HttpStatus.NOT_FOUND);
	}

	@PutMapping("/password/{id}")
	public ResponseEntity<?> cambiarPassword(@RequestBody CambioPassword body, @PathVariable int id,
			@AuthenticationPrincipal Jwt jwt) {
		acceso.propioDoctor(jwt, id);
		Doctor doctor = dserv.buscarPorId(id);
		if (doctor == null) {
			return new ResponseEntity<>("Doctor no encontrado", HttpStatus.NOT_FOUND);
		}
		if (body.nueva() == null || body.nueva().isBlank()) {
			return new ResponseEntity<>("La nueva contraseña es obligatoria", HttpStatus.BAD_REQUEST);
		}
		if (body.actual() == null || !encoder.matches(body.actual(), doctor.getPassword())) {
			return new ResponseEntity<>("La contraseña actual no es correcta", HttpStatus.BAD_REQUEST);
		}
		doctor.setPassword(encoder.encode(body.nueva()));
		return new ResponseEntity<>(dserv.modificar(doctor), HttpStatus.OK);
	}
}
