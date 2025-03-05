package hospital.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hospital.entidades.Especialidad;
import hospital.modelo.service.EspecialidadService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/especialidad")
public class EspecialidadRestController {
	
	@Autowired
	private EspecialidadService eserv;
	
	@GetMapping("all")
	public ResponseEntity<?> getAll() {
		List<Especialidad> especialidades = eserv.buscarTodos();
        if (especialidades.isEmpty()) {
            return new ResponseEntity<>("No se encontraron especialidades.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(especialidades, HttpStatus.OK);
	}
	
	
	
}
