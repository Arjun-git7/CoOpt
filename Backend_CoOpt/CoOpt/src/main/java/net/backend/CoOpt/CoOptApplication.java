package net.backend.CoOpt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = {"net.backend.controller", "net.backend.repository", "net.backend.model", "net.backend.CoOpt"})
public class CoOptApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoOptApplication.class, args);
	}

}
