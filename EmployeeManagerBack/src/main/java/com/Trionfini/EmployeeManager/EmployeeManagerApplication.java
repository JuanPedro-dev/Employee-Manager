package com.Trionfini.EmployeeManager;

import com.Trionfini.EmployeeManager.model.Employee;
import com.Trionfini.EmployeeManager.repository.EmployeeRepository;
import com.Trionfini.EmployeeManager.service.EmployeeService;
import com.Trionfini.EmployeeManager.utils.ETLEmployee;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Arrays;

@SpringBootApplication
public class EmployeeManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagerApplication.class, args);
	}

	// Esta injección es para iniciar los datos en h2, la base de datos en memoria
	@Bean
	public CommandLineRunner initData (
			EmployeeService employeeService
	){
		return (args) -> {
			ETLEmployee etlEmployee = new ETLEmployee();
			etlEmployee.writeOnFile();
			etlEmployee.LoadToDataBase(employeeService);
		};
	}


	// Solución a problemas de CORS
	@Bean
	public CorsFilter corsFilter(){
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin",
				"Content-Type", "Accept", "Authorization","Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin",
				"Content-Type", "Accept", "Authorization","Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "OPTIONS", "HEAD"));
		UrlBasedCorsConfigurationSource urlBasedCordsConfigurationsSource = new UrlBasedCorsConfigurationSource();
		urlBasedCordsConfigurationsSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCordsConfigurationsSource);
		// Importar desde => import org.springframework.web.filter.CorsFilter;
	}


}
