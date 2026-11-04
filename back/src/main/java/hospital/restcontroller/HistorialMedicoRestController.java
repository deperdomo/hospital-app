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

import hospital.entidades.HistorialMedico;
import hospital.entidades.Usuario;
import hospital.modelo.service.HistorialMedicoService;
import hospital.modelo.service.UsuarioService;
import hospital.seguridad.Acceso;

@RestController
@RequestMapping("/historialMedico")
public class HistorialMedicoRestController {

	@Autowired
	private HistorialMedicoService hmserv;
	@Autowired
	private UsuarioService userv;
	@Autowired
	private Acceso acceso;

	/** Lo crea el doctor que atiende al paciente. */
	@PostMapping("/alta/{idUsuario}")
	public ResponseEntity<?> altaHistorialMedico(@RequestBody HistorialMedico historialMedico,
			@PathVariable int idUsuario, @AuthenticationPrincipal Jwt jwt) {
		acceso.soloDoctor(jwt);
		acceso.verUsuario(jwt, idUsuario);
		Usuario usuario = userv.buscarPorId(idUsuario);
		if (usuario == null) throw Acceso.noEncontrado();
		historialMedico.setId(0);
		historialMedico.setUsuario(usuario);
		try {
			return new ResponseEntity<>(hmserv.alta(historialMedico), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("No se pudo dar de alta el historial medico", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/buscarUno/{id}")
	public ResponseEntity<?> buscarUno(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		HistorialMedico historialMedico = hmserv.buscarPorId(id);
		if (historialMedico == null) {
			return new ResponseEntity<>("no se encontro este historialMedico", HttpStatus.NOT_FOUND);
		}
		acceso.verUsuario(jwt, historialMedico.getUsuario().getId());
		return new ResponseEntity<>(historialMedico, HttpStatus.OK);
	}
}
