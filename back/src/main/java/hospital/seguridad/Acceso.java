package hospital.seguridad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import hospital.entidades.Cita;
import hospital.modelo.repository.CitaRepository;

/**
 * Comprobaciones de autorización a partir de los claims del token:
 * sub = id, tipo = paciente | doctor, rol = paciente | admin | doctor.
 * Lanzan 403 (o 404 si el recurso no existe).
 */
@Component
public class Acceso {

	@Autowired
	private CitaRepository crepo;

	public static int id(Jwt jwt) { return Integer.parseInt(jwt.getSubject()); }
	public static boolean admin(Jwt jwt) { return "admin".equals(jwt.getClaimAsString("rol")); }
	public static boolean doctor(Jwt jwt) { return "doctor".equals(jwt.getClaimAsString("tipo")); }
	public static boolean paciente(Jwt jwt) { return "paciente".equals(jwt.getClaimAsString("tipo")); }

	public static ResponseStatusException prohibido() {
		return new ResponseStatusException(HttpStatus.FORBIDDEN, "No autorizado");
	}

	public static ResponseStatusException noEncontrado() {
		return new ResponseStatusException(HttpStatus.NOT_FOUND, "No encontrado");
	}

	/** El propio paciente (o un admin). */
	public void propioUsuario(Jwt jwt, int idUsuario) {
		if (!admin(jwt) && !(paciente(jwt) && id(jwt) == idUsuario)) throw prohibido();
	}

	/** El propio doctor (o un admin). */
	public void propioDoctor(Jwt jwt, int idDoctor) {
		if (!admin(jwt) && !(doctor(jwt) && id(jwt) == idDoctor)) throw prohibido();
	}

	/** Solo doctores (o admin). */
	public void soloDoctor(Jwt jwt) {
		if (!admin(jwt) && !doctor(jwt)) throw prohibido();
	}

	/** El propio paciente, un admin o un doctor que tenga alguna cita con ese paciente. */
	public void verUsuario(Jwt jwt, int idUsuario) {
		if (doctor(jwt) && crepo.existsByUsuario_IdAndDoctor_Id(idUsuario, id(jwt))) return;
		propioUsuario(jwt, idUsuario);
	}

	/** El paciente o el doctor de la cita (o un admin). */
	public void cita(Jwt jwt, Cita cita) {
		if (cita == null) throw noEncontrado();
		if (admin(jwt)) return;
		if (paciente(jwt) && cita.getUsuario() != null && cita.getUsuario().getId() == id(jwt)) return;
		if (doctor(jwt) && cita.getDoctor() != null && cita.getDoctor().getId() == id(jwt)) return;
		throw prohibido();
	}
}
