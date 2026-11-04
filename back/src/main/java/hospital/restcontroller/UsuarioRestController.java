package hospital.restcontroller;

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

import hospital.entidades.Usuario;
import hospital.modelo.service.UsuarioService;
import hospital.seguridad.Acceso;

@RestController
@RequestMapping("/usuario")
public class UsuarioRestController {

	/** Body de PUT /password/{id} (también lo usa /doctor/password/{id}). */
	public record CambioPassword(String actual, String nueva) {}

	@Autowired
	private UsuarioService userv;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private Acceso acceso;

	@GetMapping("/buscarUno/{id}")
	public ResponseEntity<?> getUsuarioId(@PathVariable int id, @AuthenticationPrincipal Jwt jwt) {
		acceso.verUsuario(jwt, id);
		Usuario usuario = userv.buscarPorId(id);
		if (usuario != null) {
			return new ResponseEntity<>(usuario, HttpStatus.OK);
		}
		return new ResponseEntity<>("Usuario no existe", HttpStatus.NOT_FOUND);
	}

	@PostMapping("/alta")
	public ResponseEntity<?> alta(@RequestBody Usuario usuario) {
		if (usuario.getPassword() == null || usuario.getPassword().isBlank()) {
			return new ResponseEntity<>("La contraseña es obligatoria", HttpStatus.BAD_REQUEST);
		}
		usuario.setId(0);
		usuario.setRol("paciente"); // se ignora el rol que mande el cliente
		usuario.setPassword(encoder.encode(usuario.getPassword()));
		try {
			return new ResponseEntity<>(userv.alta(usuario), HttpStatus.OK);
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<>("El correo electrónico o el nombre de usuario ya están en uso", HttpStatus.CONFLICT);
		} catch (Exception e) {
			return new ResponseEntity<>("Error en el registro", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/editar")
	public ResponseEntity<?> editar(@RequestBody Usuario usuario, @AuthenticationPrincipal Jwt jwt) {
		acceso.propioUsuario(jwt, usuario.getId());
		Usuario actual = userv.buscarPorId(usuario.getId());
		if (actual == null) {
			return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
		}
		// rol y contraseña no se cambian desde aquí
		usuario.setRol(actual.getRol());
		usuario.setPassword(actual.getPassword());
		try {
			return new ResponseEntity<>(userv.modificar(usuario), HttpStatus.OK);
		} catch (DataIntegrityViolationException ex) {
			return new ResponseEntity<>("El email o el nombre de usuario ya están en uso por otro usuario", HttpStatus.CONFLICT);
		}
	}

	@PutMapping("/password/{id}")
	public ResponseEntity<?> cambiarPassword(@RequestBody CambioPassword body, @PathVariable int id,
			@AuthenticationPrincipal Jwt jwt) {
		acceso.propioUsuario(jwt, id);
		Usuario usuario = userv.buscarPorId(id);
		if (usuario == null) {
			return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
		}
		if (body.nueva() == null || body.nueva().isBlank()) {
			return new ResponseEntity<>("La nueva contraseña es obligatoria", HttpStatus.BAD_REQUEST);
		}
		if (body.actual() == null || !encoder.matches(body.actual(), usuario.getPassword())) {
			return new ResponseEntity<>("La contraseña actual no es correcta", HttpStatus.BAD_REQUEST);
		}
		usuario.setPassword(encoder.encode(body.nueva()));
		return new ResponseEntity<>(userv.modificar(usuario), HttpStatus.OK);
	}
}
