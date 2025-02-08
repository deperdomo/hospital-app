package hospital.modelo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hospital.entidades.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer>{

}
