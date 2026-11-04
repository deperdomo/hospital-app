package hospital.seguridad;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.jwk.source.ImmutableSecret;

@Configuration
public class SecurityConfig {

	@Bean
	SecretKey jwtKey(@Value("${jwt.secret}") String secret) {
		if (secret == null || secret.length() < 32) {
			throw new IllegalStateException("JWT_SECRET debe tener al menos 32 caracteres");
		}
		return new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
	}

	@Bean
	JwtDecoder jwtDecoder(SecretKey key) {
		return NimbusJwtDecoder.withSecretKey(key).build(); // HS256 por defecto
	}

	@Bean
	JwtEncoder jwtEncoder(SecretKey key) {
		return new NimbusJwtEncoder(new ImmutableSecret<>(key));
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// claim "rol" (paciente | admin | doctor) -> ROLE_<rol>
		JwtGrantedAuthoritiesConverter roles = new JwtGrantedAuthoritiesConverter();
		roles.setAuthoritiesClaimName("rol");
		roles.setAuthorityPrefix("ROLE_");
		JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
		converter.setJwtGrantedAuthoritiesConverter(roles);

		return http
				.csrf(c -> c.disable()) // API sin cookies: el token va en la cabecera Authorization
				.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(a -> a
						.requestMatchers("/error", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
						.requestMatchers(HttpMethod.POST, "/auth/login", "/usuario/alta").permitAll()
						// catálogo que usa la landing sin login
						.requestMatchers(HttpMethod.GET,
								"/especialidad/all",
								"/doctor/recomendado/*",
								"/doctor/allDoctors",
								"/doctor/localidad/*",
								"/doctor/porNombreApellidoLocalidadYEspecialidad/**",
								"/disponibilidad/doctor/*",
								"/disponibilidad/all").permitAll()
						.requestMatchers(HttpMethod.POST, "/doctor/alta").hasRole("admin")
						.anyRequest().authenticated())
				.oauth2ResourceServer(o -> o.jwt(j -> j.jwtAuthenticationConverter(converter)))
				.build();
	}
}
