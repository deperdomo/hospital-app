package hospital.entidades;

import java.io.Serializable;
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
@Table(name="recetas")
public class Receta implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
    private String nombre_medicamento;
    private String dosis;
    private String frecuencia;
    @Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(name="fecha_inicio")
    private Date fechaInicio;
    @Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(name="fecha_fin")
    private Date fechaFin;
    private String instrucciones;
    
    @ManyToOne
	@JoinColumn(name="id_paciente")
    private Usuario usuario;
    
    @ManyToOne
	@JoinColumn(name="id_historial_medico")
    private HistorialMedico historialMedico;
    @ManyToOne
	@JoinColumn(name="id_cita")
    private Cita cita;
    
}
