package com.AMS.Apartment_Management_System.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.AMS.Apartment_Management_System.Services.UserServiceImpl;
import com.AMS.Apartment_Management_System.entities.User;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class UserProfileController {

    private final UserServiceImpl userService;

    @Autowired
    public UserProfileController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> profileData) {
        try {
            String username = profileData.get("username");
            User user = userService.getUserByUsername(username);
            
            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            // Update user fields
            user.setUsername(profileData.get("newUsername"));
            user.setEmail(profileData.get("email"));
            user.setHouseNo(profileData.get("houseNo"));
            user.setPhone(profileData.get("phone"));

            // Save updated user
            userService.saveUser(user);

            return ResponseEntity.ok().body(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating profile: " + e.getMessage());
        }
    }
} 