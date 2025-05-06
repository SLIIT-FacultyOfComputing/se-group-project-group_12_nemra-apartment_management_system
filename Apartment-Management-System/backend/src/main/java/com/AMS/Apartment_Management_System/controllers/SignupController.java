package com.AMS.Apartment_Management_System.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.AMS.Apartment_Management_System.Services.UserServiceImpl;
import com.AMS.Apartment_Management_System.entities.User;

import io.micrometer.core.ipc.http.HttpSender.Response;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend origin
public class SignupController {

    private final UserServiceImpl userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public SignupController(UserServiceImpl userService) {
        this.userService = userService;
    }

    class LoginUser {
        public String username;
        public String email;
        public Boolean isAdmin;

        public LoginUser(String username, String email, Boolean isAdmin) {
            this.username = username;
            this.email = email;
            this.isAdmin = isAdmin;
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> processSignupForm(@RequestBody Map<String, String> formData) {
        try {
            System.out.println("Received signup request with data: " + formData);

            // Validate required fields
            if (!formData.containsKey("username") || !formData.containsKey("email") || 
                !formData.containsKey("password")) {
                System.out.println("Missing required fields in request");
                return ResponseEntity.badRequest().body("Missing required fields");
            }

            // Check if user already exists
            if (userService.userExists(formData.get("username"), formData.get("email"))) {
                System.out.println("User already exists: " + formData.get("username"));
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User already exists");
            }

            // Create new user
            User user = new User();
            user.setEmail(formData.get("email"));
            user.setUsername(formData.get("username"));
            user.setIsAdmin(false);
            user.setPassword(passwordEncoder.encode(formData.get("password")));

            System.out.println("Creating new user: " + user.getUsername());

            // Save the user to the database
            userService.saveUser(user);
            System.out.println("User saved successfully");

            // Return success response with user data
            LoginUser loginUser = new LoginUser(
                user.getUsername(),
                user.getEmail(),
                user.getIsAdmin()
            );
            System.out.println("Returning response with user data: " + loginUser.username);
            return ResponseEntity.ok().body(loginUser);
        } catch (Exception e) {
            System.err.println("Error during signup: " + e.getMessage());
            e.printStackTrace(); // Print full stack trace
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error during registration: " + e.getMessage());
        }
    }
}