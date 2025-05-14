package hospital.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hospital.entidades.HistorialMedico;
import hospital.entidades.Usuario;
import hospital.modelo.service.HistorialMedicoService;
import hospital.modelo.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/historialMedico")
public class HistorialMedicoRestController {
	
	@Autowired
	private HistorialMedicoService hmserv;
	@Autowired
	private UsuarioService userv;
	@PostMapping("/alta/{idUsuario}")
	public ResponseEntity<?> altaHistorialMedico(@RequestBody HistorialMedico historialMedico,@PathVariable int idUsuario) {
		try {
			Usuario usuario = userv.buscarPorId(idUsuario);
			historialMedico.setUsuario(usuario);
			System.out.println(usuario);
			HistorialMedico nuevoHistorialMedico = hmserv.alta(historialMedico);
			System.out.println(nuevoHistorialMedico);
			//nuevoHistorialMedico.setUsuario(usuario);
			return new ResponseEntity<>(nuevoHistorialMedico, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("No se pudo dar de alta  el historial medico", HttpStatus.NOT_FOUND);
		}
		
	}
	
	@GetMapping("/buscarUno/{id}")
	public ResponseEntity<?> buscarUno(@PathVariable int id) {
		HistorialMedico historialMedico=hmserv.buscarPorId(id);
		if (historialMedico!=null) {
			
			return new ResponseEntity<>(historialMedico, HttpStatus.OK);
		}
		return new ResponseEntity<>("no se encontro este historialMedico", HttpStatus.NOT_FOUND);
	}
	
}
