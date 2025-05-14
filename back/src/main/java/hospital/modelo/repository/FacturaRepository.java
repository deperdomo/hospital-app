package hospital.modelo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hospital.entidades.Factura;

public interface FacturaRepository extends JpaRepository<Factura, Integer>{

}
