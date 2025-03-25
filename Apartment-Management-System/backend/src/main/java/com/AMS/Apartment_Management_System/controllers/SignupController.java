package com.AMS.Apartment_Management_System.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.AMS.Apartment_Management_System.Services.UserServiceImpl;
import com.AMS.Apartment_Management_System.entities.User;

@RestController
public class SignupController {

    private final UserServiceImpl userService;
@Autowired
    private PasswordEncoder passwordEncoder;
	@Autowired
    public SignupController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/signup")
    public String showSignupForm(Model model) {
        return "signup_page.html";
    }
    class LoginUser{
		public String username;
		public String email;
		public LoginUser(String username,String email){
			this.username = username;
			this.email = email;
		}	
	};
    @PostMapping("/signup")
    public ResponseEntity<?> processSignupForm(@RequestBody Map<String, String> formData) {
		if (userService.userExists(formData.get("username"), formData.get("email"))) {
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("User already exists Found");
		}
        User user = new User();
        user.setEmail(formData.get("email"));

        user.setUsername(formData.get("username"));

        user.setPassword(passwordEncoder.encode(formData.get("password")));

        // Save the user to the database
        userService.saveUser(user);
        LoginUser loginUser = new LoginUser(user.getUsername(),user.getEmail());
			return ResponseEntity.ok().body(loginUser);
    }
}