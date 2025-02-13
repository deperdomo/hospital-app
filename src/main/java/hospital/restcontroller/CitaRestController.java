package hospital.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hospital.entidades.Cita;
import hospital.entidades.Doctor;
import hospital.entidades.Usuario;
import hospital.modelo.service.CitaService;
import hospital.modelo.service.DoctorService;
import hospital.modelo.service.UsuarioService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/cita")
public class CitaRestController {

	@Autowired
	private CitaService cserv;
	
	@Autowired
	private UsuarioService userv;
	
	@Autowired
	private DoctorService dserv;
	
	@GetMapping("/misCitasDoctor/{id}")
	public ResponseEntity<?> buscarCitaDoctor(@PathVariable int id) {
		Doctor doctor = dserv.buscarPorId(id);
		if (doctor != null) {
			return new ResponseEntity<>(cserv.buscarCitaPorDoctor(id), HttpStatus.OK);
		}
		return new ResponseEntity<>("Ese doctor no tiene reservas", HttpStatus.NOT_FOUND);
		//return new ResponseEntity<>(cserv.buscarCitaPorDoctor(),  HttpStatus.OK);
	}
	
	//citas del usuario
	@GetMapping("/misCitasUsuario/{id}")
	public ResponseEntity<?> buscarCitaUsuario(@PathVariable int id){
		Usuario usuario = userv.buscarPorId(id);
		if (usuario != null) {
			//quiero una lista de las citas de los usuarios
			//List citas= ;
			
			return new ResponseEntity<>(cserv.buscarCitaPorUsuario(usuario.getId()), HttpStatus.OK);
		}
		 return new ResponseEntity<>("Ese usuario no tiene reserva", HttpStatus.NOT_FOUND);
	}
}
