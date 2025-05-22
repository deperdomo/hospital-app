# 🏥 Hospital Management System

Una aplicación web completa para la gestión hospitalaria que permite administrar pacientes, médicos, citas médicas y otros recursos del hospital de manera eficiente y moderna.

## 🌟 Características

- **Gestión de Pacientes**: Registro, consulta y actualización de información de pacientes
- **Gestión de Médicos**: Administración de personal médico y especialidades
- **Sistema de Citas**: Programación y seguimiento de citas médicas
- **API REST**: Backend robusto con documentación automática
- **Interfaz Moderna**: Frontend responsive y fácil de usar
- **Base de Datos**: Persistencia confiable con MySQL

## 🛠️ Stack Tecnológico

### Backend
- **Java 21** - Lenguaje de programación
- **Spring Boot 3.4.2** - Framework principal
- **Spring Data JPA** - Persistencia de datos
- **MySQL** - Base de datos relacional
- **Maven** - Gestión de dependencias
- **Lombok** - Reducción de código boilerplate
- **OpenAPI/Swagger** - Documentación de API
- **Spring Validation** - Validación de datos

### Frontend
- **Angular 19** - Framework de aplicación web
- **TypeScript** - Lenguaje tipado
- **Tailwind CSS** - Framework de estilos
- **RxJS** - Programación reactiva
- **Angular CLI** - Herramientas de desarrollo

## 📁 Estructura del Proyecto

```
hospital-app/
├── back/                    # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/java/
│   │   └── test/java/
│   ├── pom.xml
│   └── mvnw
├── front/                   # Frontend (Angular)
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── index.html
│   ├── package.json
│   └── angular.json
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Java 21** o superior
- **Node.js 18** o superior
- **npm** o **yarn**
- **MySQL 8.0** o superior
- **Maven 3.6** o superior

### Backend (Spring Boot)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/deperdomo/hospital-app.git
   cd hospital-app/back
   ```

2. **Configurar la base de datos**
   ```sql
   CREATE DATABASE hospital_db;
   CREATE USER 'hospital_user'@'localhost' IDENTIFIED BY 'hospital_pass';
   GRANT ALL PRIVILEGES ON hospital_db.* TO 'hospital_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Configurar `application.properties`**
   ```properties
   # Configuración de la base de datos
   spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
   spring.datasource.username=hospital_user
   spring.datasource.password=hospital_pass
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   
   # Configuración de JPA
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
   
   # Puerto del servidor
   server.port=8080
   ```

4. **Ejecutar la aplicación**
   ```bash
   ./mvnw spring-boot:run
   ```

   O usando Maven instalado:
   ```bash
   mvn spring-boot:run
   ```

### Frontend (Angular)

1. **Navegar al directorio frontend**
   ```bash
   cd ../front
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación en modo desarrollo**
   ```bash
   npm start
   ```

   O usando Angular CLI:
   ```bash
   ng serve
   ```

## 🌐 URLs de Acceso

### Desarrollo
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080
- **Documentación API (Swagger)**: http://localhost:8080/swagger-ui.html

### Endpoints Principales
- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Crear paciente
- `GET /api/doctors` - Listar médicos
- `POST /api/appointments` - Crear cita médica

## 🧪 Testing

### Backend
```bash
cd back
./mvnw test
```

### Frontend
```bash
cd front
npm test
```

## 📦 Construcción para Producción

### Backend
```bash
cd back
./mvnw clean package
```

El archivo JAR se generará en `target/hospital-api-0.0.1-SNAPSHOT.jar`

### Frontend
```bash
cd front
npm run build
```

Los archivos estáticos se generarán en el directorio `dist/`

## 🐳 Docker (Opcional)

### Backend
```dockerfile
FROM openjdk:21-jre-slim
COPY target/hospital-api-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

### Frontend
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/front-hospital /usr/share/nginx/html
EXPOSE 80
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Convenciones de Código

### Backend
- Uso de **Lombok** para reducir boilerplate
- Validaciones con **Bean Validation**
- Nomenclatura en inglés para entidades y servicios
- Documentación con **JavaDoc**

### Frontend
- Seguir **Angular Style Guide**
- Uso de **TypeScript** estricto
- Componentes modulares y reutilizables
- Estilos con **Tailwind CSS**

## 🐛 Problemas Conocidos

- Pendiente implementar autenticación JWT
- Falta sistema de notificaciones en tiempo real
- Necesita implementar paginación en listados

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autores

- **[@smoral1](https://github.com/smoral1)**  

- **[@DiegoMartzG](https://github.com/DiegoMartzG)**  

- **[@deperdomo](https://github.com/deperdomo)**  


## 🆘 Soporte

Si tienes alguna pregunta o problema, por favor:

1. Revisa los [Issues existentes](https://github.com/deperdomo/hospital-app/issues)
2. Crea un [nuevo Issue](https://github.com/deperdomo/hospital-app/issues/new) si es necesario
3. Incluye detalles del problema y pasos para reproducirlo

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella!
