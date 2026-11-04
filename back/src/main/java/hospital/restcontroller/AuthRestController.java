package hospital.restcontroller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hospital.entidades.Doctor;
import hospital.entidades.Usuario;
import hospital.modelo.service.DoctorService;
import hospital.modelo.service.UsuarioService;

@RestController
@RequestMapping("/auth")
public class AuthRestController {

	public record LoginRequest(String username, String password, String tipo) {}

	@Autowired
	private UsuarioService userv;
	@Autowired
	private DoctorService dserv;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private JwtEncoder jwtEncoder;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest req) {
		if (req.username() == null || req.password() == null) {
			return new ResponseEntity<>("Faltan credenciales", HttpStatus.BAD_REQUEST);
		}

		// usuarios y doctores están en tablas distintas y pueden repetir username
		Object perfil;
		int id;
		String rol, hash;
		if ("doctor".equals(req.tipo())) {
			Doctor d = dserv.buscarPorUsername(req.username());
			if (d == null) return credencialesIncorrectas();
			perfil = d; id = d.getId(); rol = "doctor"; hash = d.getPassword();
		} else if ("paciente".equals(req.tipo())) {
			Usuario u = userv.buscarPorUsername(req.username());
			if (u == null) return credencialesIncorrectas();
			perfil = u; id = u.getId(); rol = u.getRol(); hash = u.getPassword();
		} else {
			return new ResponseEntity<>("tipo debe ser 'paciente' o 'doctor'", HttpStatus.BAD_REQUEST);
		}

		if (hash == null || !encoder.matches(req.password(), hash)) return credencialesIncorrectas();

		Instant ahora = Instant.now();
		JwtClaimsSet claims = JwtClaimsSet.builder()
				.subject(String.valueOf(id))
				.claim("tipo", req.tipo())
				.claim("rol", rol)
				.issuedAt(ahora)
				.expiresAt(ahora.plus(8, ChronoUnit.HOURS))
				.build();
		String token = jwtEncoder
				.encode(JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims))
				.getTokenValue();

		// perfil sin contraseña: el campo password es WRITE_ONLY en las entidades
		return ResponseEntity.ok(Map.of("token", token, "perfil", perfil));
	}

	private ResponseEntity<?> credencialesIncorrectas() {
		return new ResponseEntity<>("Credenciales incorrectas", HttpStatus.UNAUTHORIZED);
	}
}
