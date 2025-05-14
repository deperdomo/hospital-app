package hospital.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hospital.entidades.Disponibilidad;
import hospital.modelo.service.DisponibilidadService;
import hospital.modelo.service.DoctorService;


@RestController
@CrossOrigin(origins="*")
@RequestMapping("/disponibilidad")
public class DisponibilidadRestController {

	@Autowired
	private DisponibilidadService diserv;
	@Autowired
	private DoctorService doserv;
	
	@GetMapping("/doctor/{id}")
	public ResponseEntity<?> buscarPorDoctor(@PathVariable int id) {
	    try {
	        return new ResponseEntity<>(diserv.buscarPorDoctor(doserv.buscarPorId(id)), HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("No se encuentra la disponibilidad", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PostMapping("/alta")
	public ResponseEntity<?> alta(@RequestBody Disponibilidad disponibilidad) {
	    try {
	    	Disponibilidad nuevaDisponibilidad = diserv.alta(disponibilidad);
	        return new ResponseEntity<>(nuevaDisponibilidad, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error en el registro", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PutMapping("/editar")
	public ResponseEntity<?> editar(@RequestBody Disponibilidad disponibilidad) {
	    try {
	    	Disponibilidad nuevaDisponibilidad = diserv.modificar(disponibilidad);
	        return new ResponseEntity<>(nuevaDisponibilidad, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error en la modificación", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	
	
}
