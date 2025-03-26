package hospital.modelo.service;

import java.util.List;

import hospital.entidades.Cita;
import hospital.entidades.Receta;

public interface RecetaService extends GenericCRUD<Receta, Integer>{
		List<Receta> buscarRecetaCita(int idCita);
}
