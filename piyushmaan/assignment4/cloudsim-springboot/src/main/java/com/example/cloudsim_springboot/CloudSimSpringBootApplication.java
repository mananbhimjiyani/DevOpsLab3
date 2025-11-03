package com.example.cloudsim_springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example")
public class CloudSimSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(CloudSimSpringBootApplication.class, args);
		System.out.println("CloudSim Spring Boot Application Started...");
	}

}
