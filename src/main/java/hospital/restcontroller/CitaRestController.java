package hospital.restcontroller;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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
		System.out.println("Este es el dictor"+doctor);
		if (doctor != null) {
			System.out.println("Estas son las citas: "+cserv.buscarCitaPorDoctor(dserv.buscarPorId(id)));
			return new ResponseEntity<>(cserv.buscarCitaPorDoctor(dserv.buscarPorId(id)), HttpStatus.OK);
		}
		return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	

	@GetMapping("/misCitasUsuario/{id}")
	public ResponseEntity<?> buscarCitasActivasUsuario(@PathVariable int id){
		Usuario usuario = userv.buscarPorId(id);
		if (usuario != null) {
			
			return new ResponseEntity<>(cserv.buscarCitasActivasPorUsuario(userv.buscarPorId(id), "pendiente"), HttpStatus.OK);
		}
		 return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/misCitasUsuarioTerminado/{id}")
	public ResponseEntity<?> buscarCitasTerminadoUsuario(@PathVariable int id){
		Usuario usuario = userv.buscarPorId(id);
		if (usuario != null) {
			
			return new ResponseEntity<>(cserv.buscarCitasActivasPorUsuarioTerminada(userv.buscarPorId(id), "terminada"), HttpStatus.OK);
		}
		 return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/misCitasCanceladasUsuario/{id}")
	public ResponseEntity<?> buscarCitasCanceladasUsuario(@PathVariable int id){
		Usuario usuario = userv.buscarPorId(id);
		if (usuario != null) {
			
			return new ResponseEntity<>(cserv.buscarCitasCanceladasPorUsuario(userv.buscarPorId(id), "cancelada"), HttpStatus.OK);
		}
		 return new ResponseEntity<>("Ha ocurrido un error", HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/alta")
	public ResponseEntity<?> alta(@RequestBody Cita cita) {
	    try {
	    	Cita nuevaCita = cserv.alta(cita);
	        return new ResponseEntity<>(nuevaCita, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error en el registro", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@GetMapping("/citasNoVistas/{id}")
	public ResponseEntity<?> buscarCitasNoVistas(@PathVariable int id) {
		Usuario usuario = userv.buscarPorId(id);
		if (usuario != null) {
			return new ResponseEntity<>(cserv.buscarCitasNoVistas(id), HttpStatus.OK);
		}
		return new ResponseEntity<>("Ha ocurrido un error ", HttpStatus.NOT_FOUND);
	}

	@PutMapping("/cancelar/{id}")
	public ResponseEntity<?> cancelarCita(@PathVariable int id){
		Cita cita = cserv.buscarPorId(id);
		cita.setEstado("cancelada");
		cserv.modificar(cita);
		return new ResponseEntity<>(cita, HttpStatus.OK);

	}
	
	@PutMapping("/marcarComoVista/{id}")
	public ResponseEntity<?> marcarCitaComoVista(@PathVariable int id){
		Cita cita = cserv.buscarPorId(id);
		cita.setVisto(1);
		cserv.modificar(cita);
		return new ResponseEntity<>(cita, HttpStatus.OK);
		
	}

	
}
