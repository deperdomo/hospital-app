package hospital.modelo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hospital.entidades.Doctor;
import hospital.modelo.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	DoctorRepository drepo;
	
	@Override
	public Doctor alta(Doctor entidad) {
		if (drepo.existsById(entidad.getId())) {
			return null;
		} else {
			return drepo.save(entidad);
		}
	}

	@Override
	public Doctor modificar(Doctor entidad) {
		try {
			if (drepo.existsById(entidad.getId())) {
				return drepo.save(entidad);
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int eliminar(Doctor entidad) {
		return eliminarPorId(entidad.getId());
	}

	@Override
	public int eliminarPorId(Integer id) {
		try {
			if (drepo.existsById(id)) {
				drepo.deleteById(id);
				return 1;
			} else {
				return 0;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	@Override
	public Doctor buscarPorId(Integer id) {
		return drepo.findById(id).orElse(null);
	}

	@Override
	public List<Doctor> buscarTodos() {
		return drepo.findAll();
	}

	@Override
	public List<Doctor> buscarPorNombreApellidoLocalidadYEspecialidad(String nombre, String apellidos, String localidad, String especialidad) {
        return drepo.findByNombreOrApellidosOrLocalidadOrEspecialidad(nombre, apellidos, localidad, especialidad);
    }

	@Override
	public List<Doctor> buscarPorLocalidad(String localidad) {
		return drepo.findByLocalidadContains(localidad);
	}

	@Override
	public Doctor buscarPorUsername(String username) {
		return drepo.findByUsername(username);
	}

	//@Override
	//public List<Doctor> buscarDoctorPorEspecialidad(int idEspecialidad) {
		
		//return drepo.findByDoctorEspecialidad(idEspecialidad);
	//}

	


}
