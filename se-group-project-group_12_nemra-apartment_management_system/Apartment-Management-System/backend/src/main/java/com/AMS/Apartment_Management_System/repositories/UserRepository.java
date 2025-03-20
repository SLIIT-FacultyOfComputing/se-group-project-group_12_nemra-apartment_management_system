package com.AMS.Apartment_Management_System.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AMS.Apartment_Management_System.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);

	User findByUsernameAndEmail(String username, String email);

	User findByUsernameAndPassword(String username, String password);

	User findByEmail(String email);
}
