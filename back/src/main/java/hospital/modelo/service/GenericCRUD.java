package hospital.modelo.service;

import java.util.List;

public interface GenericCRUD<T, ID> {
	
	T alta(T entidad);
	T modificar(T entidad);
	int eliminar(T entidad);
	int eliminarPorId(ID id);
	T buscarPorId(ID id);
	List<T> buscarTodos();
	
}
