package hospital.restcontroller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hospital.entidades.Usuario;
import hospital.modelo.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/doctor")
public class DoctorRestController {
	
	@Autowired
	private UsuarioService userv;
	
	@GetMapping("recomendado/{cantidad}")
	public ResponseEntity<?> getMedicos(@PathVariable int cantidad) {
	    List<Usuario> medicos = userv.buscaPorRol("medico");
	    if (medicos != null && !medicos.isEmpty()) {
	        List<Usuario> NMedicos = medicos.stream().limit(cantidad).collect(Collectors.toList());
	        return new ResponseEntity<>(NMedicos, HttpStatus.OK);
	    }
	    return new ResponseEntity<>("No hay medicos", HttpStatus.NOT_FOUND);
	}
}
