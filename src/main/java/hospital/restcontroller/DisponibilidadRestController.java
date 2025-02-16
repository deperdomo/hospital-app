package hospital.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	
	
}
