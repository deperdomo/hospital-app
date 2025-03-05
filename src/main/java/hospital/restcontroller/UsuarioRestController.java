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
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@PutMapping("/editar")
	public ResponseEntity<?> marcarCitaComoVista(@RequestBody Usuario usuario) {
	    try {
	        if (usuario == null) {
	            return new ResponseEntity<>("Usuario no proporcionado", HttpStatus.BAD_REQUEST);
	        }

	        if (userv.modificar(usuario) != null) {
	            return new ResponseEntity<>(usuario, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Ha ocurrido un error al editar", HttpStatus.NOT_FOUND);
	        }
	    } catch (DataIntegrityViolationException ex) {
	        if (ex.getMessage().contains("Duplicate entry")) {
	            return new ResponseEntity<>("El email proporcionado ya está en uso por otro usuario", HttpStatus.CONFLICT);
	        } else {
	            return new ResponseEntity<>("Error de integridad de datos: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
	        }
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error interno del servidor: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	
	
}
