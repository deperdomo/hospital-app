package hospital.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hospital.entidades.Cita;
import hospital.entidades.HistorialMedico;
import hospital.entidades.Receta;
import hospital.modelo.service.CitaService;
import hospital.modelo.service.HistorialMedicoService;
import hospital.modelo.service.RecetaService;
import hospital.seguridad.Acceso;

@RestController
@RequestMapping("/receta")
public class RecetaRestController {

	@Autowired
	private RecetaService rserv;
	@Autowired
	private CitaService cserv;
	@Autowired
	private HistorialMedicoService hmserv;
	@Autowired
	private Acceso acceso;

	/** La crea el doctor de la cita. */
	@PostMapping("/alta/{idUsuario}/{idCita}/{idHistorialMedico}")
	public ResponseEntity<?> altaReceta(@PathVariable int idUsuario, @PathVariable int idCita,
			@PathVariable int idHistorialMedico, @RequestBody Receta receta, @AuthenticationPrincipal Jwt jwt) {
		acceso.soloDoctor(jwt);
		Cita cita = cserv.buscarPorId(idCita);
		acceso.cita(jwt, cita);
		HistorialMedico historialMedico = hmserv.buscarPorId(idHistorialMedico);
		if (historialMedico == null) throw Acceso.noEncontrado();
		// cita, historial y paciente tienen que cuadrar
		if (cita.getUsuario().getId() != idUsuario || historialMedico.getUsuario().getId() != idUsuario) {
			return new ResponseEntity<>("La cita o el historial no pertenecen a ese paciente", HttpStatus.BAD_REQUEST);
		}
		receta.setId(0);
		receta.setCita(cita);
		receta.setUsuario(cita.getUsuario());
		receta.setHistorialMedico(historialMedico);
		try {
			return new ResponseEntity<>(rserv.alta(receta), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("No se pudo dar de alta la receta", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/miReceta/{idUsuario}/{idCita}")
	public ResponseEntity<?> verMisRecetas(@PathVariable int idUsuario, @PathVariable int idCita,
			@AuthenticationPrincipal Jwt jwt) {
		Cita cita = cserv.buscarPorId(idCita);
		acceso.cita(jwt, cita);
		return new ResponseEntity<>(rserv.buscarRecetaCita(cita.getId()), HttpStatus.OK);
	}

	/** true si la cita ya tiene alguna receta. */
	@GetMapping("/citaReceta/{idCita}")
	public ResponseEntity<?> buscarCitaReceta(@PathVariable int idCita, @AuthenticationPrincipal Jwt jwt) {
		Cita cita = cserv.buscarPorId(idCita);
		acceso.cita(jwt, cita);
		return new ResponseEntity<>(!rserv.buscarRecetaCita(idCita).isEmpty(), HttpStatus.OK);
	}
}
