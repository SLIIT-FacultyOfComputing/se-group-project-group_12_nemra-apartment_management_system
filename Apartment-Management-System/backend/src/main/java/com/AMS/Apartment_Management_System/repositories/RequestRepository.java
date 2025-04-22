package com.AMS.Apartment_Management_System.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AMS.Apartment_Management_System.entities.Request;

public interface RequestRepository extends JpaRepository<Request, Long> {
}