package com.AMS.Apartment_Management_System;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ApartmentManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApartmentManagementSystemApplication.class, args);
	}

}
