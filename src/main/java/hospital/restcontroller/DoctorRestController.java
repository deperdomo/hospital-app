package hospital.restcontroller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

import hospital.entidades.Doctor;
import hospital.modelo.service.DoctorService;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/doctor")
public class DoctorRestController {
	
		@Autowired
		private DoctorService dserv;
		
		@PostMapping("/alta")
		public ResponseEntity<?> alta(@RequestBody Doctor doctor) {
		    try {
		    	Doctor nuevoDoctor = dserv.alta(doctor);
		        return new ResponseEntity<>(nuevoDoctor, HttpStatus.OK);
		    } catch (DataIntegrityViolationException e) {
		        return new ResponseEntity<>("El correo electrónico o el nombre de doctor ya están en uso", HttpStatus.CONFLICT);
		    } catch (Exception e) {
		        return new ResponseEntity<>("Error en el registro", HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		}
		
		@GetMapping("recomendado/{cantidad}")
		public ResponseEntity<?> getMedicos(@PathVariable int cantidad) {
		    List<Doctor> medicos = dserv.buscarTodos();
		    if (medicos != null && !medicos.isEmpty()) {
		        List<Doctor> NMedicos = medicos.stream()
		            .sorted((d1, d2) -> Integer.compare(d2.getVotos(), d1.getVotos())) // Ordenar por votos en orden descendente
		            .limit(cantidad)
		            .collect(Collectors.toList());
		        return new ResponseEntity<>(NMedicos, HttpStatus.OK);
		    }
		    return new ResponseEntity<>("No hay medicos", HttpStatus.NOT_FOUND);
		}
	
		
		@GetMapping("one/{id}")
		public ResponseEntity<?> getMedicoById(@PathVariable int id) {
		    if (dserv.buscarPorId(id) != null) {
		    	return new ResponseEntity<>(dserv.buscarPorId(id), HttpStatus.OK);
		    }
		    return new ResponseEntity<>("Ese medico no existe", HttpStatus.NOT_FOUND);
		}
		
		@GetMapping("oneByUsername/{username}")
		public ResponseEntity<?> getOne(@PathVariable String username) {
			if (dserv.buscarPorUsername(username) != null) {
				return new ResponseEntity<>(dserv.buscarPorUsername(username), HttpStatus.OK);
			}
			return new ResponseEntity<>("Medico no existe", HttpStatus.NOT_FOUND);
		}
		
		@GetMapping("/allDoctors")
	    public ResponseEntity<?> todos() {
	        List<Doctor> doctores = dserv.buscarTodos();
	        if (doctores.isEmpty()) {
	            return new ResponseEntity<>("No se encontraron doctores.", HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(doctores, HttpStatus.OK);
	    }
		
		
		 @GetMapping("/porNombreApellidoLocalidadYEspecialidad/{nombre}/{apellidos}/{localidad}/{especialidad}")
		    public ResponseEntity<?> buscarPorNombreApellidoLocalidadYEspecialidad(@PathVariable String nombre,
		                                                                           @PathVariable String apellidos,
		                                                                           @PathVariable String localidad,
		                                                                           @PathVariable String especialidad) {
		        List<Doctor> doctores = dserv.buscarPorNombreApellidoLocalidadYEspecialidad(nombre, apellidos, localidad, especialidad);
		        if (doctores.isEmpty()) {
		            return new ResponseEntity<>("No se encontraron doctores", HttpStatus.NOT_FOUND);
		        }
		        return new ResponseEntity<>(doctores, HttpStatus.OK);
		}
	
	 	@GetMapping("/localidad/{localidad}")
	    public ResponseEntity<?> porLocalidad(@PathVariable String localidad) {
	        List<Doctor> doctores = dserv.buscarPorLocalidad(localidad);
	        if (doctores.isEmpty()) {
	            return new ResponseEntity<>("No se encontraron doctores.", HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(doctores, HttpStatus.OK);
	    }
	 
	 	@PutMapping("/votar/{idDoctor}/{valoracion}")
	 	public ResponseEntity<?> votarDoctor(@PathVariable int idDoctor, @PathVariable boolean valoracion) {
	 		Doctor doctor = dserv.buscarPorId(idDoctor);
	 		if (doctor != null) {
				if (valoracion) {
					doctor.setVotos(doctor.getVotos() + 1);
				} else {
					doctor.setVotos(doctor.getVotos() - 1);
				}
				if (dserv.modificar(doctor) != null) {
					return new ResponseEntity<>(doctor, HttpStatus.OK);
				}
				return new ResponseEntity<>("No se pudo modificar el doctor", HttpStatus.NOT_FOUND);
			} else {
				return new ResponseEntity<>("No se encontró el doctor", HttpStatus.NOT_FOUND);
			}
	 	}
	 	
	 	
	 
	 	
}
	
	
	
	

