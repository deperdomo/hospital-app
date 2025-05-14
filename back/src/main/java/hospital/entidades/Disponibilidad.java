package hospital.entidades;

import java.io.Serializable;
import java.sql.Time;
import java.time.LocalTime;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="disponibilidad")
public class Disponibilidad implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@DateTimeFormat(pattern = "HH:mm:ss")
	@Column(name = "hora_inicio")
	private LocalTime horaInicio;
	@DateTimeFormat(pattern = "HH:mm:ss")
	@Column(name = "hora_fin")
	private LocalTime horaFin;
	private String estado;  
	private String comentarios;
	
	@ManyToOne
	@JoinColumn(name="id_doctor")
	private Doctor doctor;
	
}
