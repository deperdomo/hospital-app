package hospital.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
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

import hospital.entidades.Disponibilidad;
import hospital.modelo.service.DisponibilidadService;
import hospital.modelo.service.DoctorService;
import hospital.seguridad.Acceso;

@RestController
@RequestMapping("/disponibilidad")
public class DisponibilidadRestController {

	@Autowired
	private DisponibilidadService diserv;
	@Autowired
	private DoctorService doserv;
	@Autowired
	private Acceso acceso;

	/** Público: lo usa la landing para mostrar el horario de los doctores. */
	@GetMapping("/doctor/{id}")
	public ResponseEntity<?> buscarPorDoctor(@PathVariable int id) {
		try {
			return new ResponseEntity<>(diserv.buscarPorDoctor(doserv.buscarPorId(id)), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("No se encuentra la disponibilidad", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/alta")
	public ResponseEntity<?> alta(@RequestBody Disponibilidad disponibilidad, @AuthenticationPrincipal Jwt jwt) {
		acceso.propioDoctor(jwt, idDoctor(disponibilidad));
		disponibilidad.setId(0);
		try {
			return new ResponseEntity<>(diserv.alta(disponibilidad), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error en el registro", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/editar")
	public ResponseEntity<?> editar(@RequestBody Disponibilidad disponibilidad, @AuthenticationPrincipal Jwt jwt) {
		Disponibilidad actual = diserv.buscarPorId(disponibilidad.getId());
		if (actual == null) throw Acceso.noEncontrado();
		acceso.propioDoctor(jwt, idDoctor(actual));
		acceso.propioDoctor(jwt, idDoctor(disponibilidad));
		try {
			return new ResponseEntity<>(diserv.modificar(disponibilidad), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error en la modificación", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private static int idDoctor(Disponibilidad d) {
		return d.getDoctor() == null ? -1 : d.getDoctor().getId();
	}
}
