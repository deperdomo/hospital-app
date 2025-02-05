package hospital.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hospital.modelo.service.UsuarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


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
	
}
