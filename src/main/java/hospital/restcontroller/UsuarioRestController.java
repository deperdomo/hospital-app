package hospital.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hospital.entidades.Usuario;
import hospital.modelo.service.UsuarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/usuario")
public class UsuarioRestController {
	
	@Autowired
	private UsuarioService userv;
	
	@GetMapping("one/{username}")
	public ResponseEntity<?> getOne(@PathVariable String username) {
		if (userv.buscarPorUsername(username) != null) {
			return new ResponseEntity<>(userv.buscarPorUsername(username), HttpStatus.OK);
		}
		return new ResponseEntity<>("Usuario no existe", HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/alta")
	public ResponseEntity<?> alta(@RequestBody Usuario usuario) {
	    try {
	        Usuario nuevoUsuario = userv.alta(usuario);
	        return new ResponseEntity<>(nuevoUsuario, HttpStatus.OK);
	    } catch (DataIntegrityViolationException e) {
	        return new ResponseEntity<>("El correo electrónico o el nombre de usuario ya están en uso", HttpStatus.CONFLICT);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error en el registro", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	
	
}
