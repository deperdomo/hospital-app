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
@Table(name="doctores")
public class Doctor implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String nombre;
	private String username;
	private String apellidos;
	private String email;
	private String provincia;
	private String localidad;
	private String direccion;
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(name="fecha_alta")
	private Date fechaAlta;
	@Column(name="foto_perfil")
	private String fotoPerfil;
	private String password;
	private int experiencia;
	@Column(name="precio_consulta")
	private int precioConsulta;
	private String sexo;
	private int votos;
	
	@ManyToOne
	@JoinColumn(name="id_especialidad")
	private Especialidad especialidad;
	
}
