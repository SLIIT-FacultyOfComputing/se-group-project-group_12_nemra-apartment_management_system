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
public class SignupController {

    private final UserServiceImpl userService;
@Autowired
    private PasswordEncoder passwordEncoder;
	@Autowired
    public SignupController(UserServiceImpl userService) {
        this.userService = userService;
    }
    class LoginUser{
		public String username;
		public String email;
		public LoginUser(String username,String email){
			this.username = username;
			this.email = email;
		}	
	};
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/google-auth")
    public ResponseEntity<?> GoogleLogin(@RequestBody String email){
        System.out.println(email);
        email = email.substring(10,email.length() - 2);
        User user = userService.getUserByEmail(email);
        if (user == null){
            user = new User();
            user.setEmail(email);
            String username = email.split("@")[0];
            user.setUsername(username);
            user.setIsAdmin(false);
            user.setPassword(passwordEncoder.encode("yushriisgay"));
            userService.saveUser(user);
        }
        LoginUser loginUser = new LoginUser(user.getUsername(),user.getEmail());
		return ResponseEntity.ok().body(loginUser);
    }
    @PostMapping("/signup")
    public ResponseEntity<?> processSignupForm(@RequestBody Map<String, String> formData) {
		if (userService.userExists(formData.get("username"), formData.get("email"))) {
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("User already exists Found");
		}
        User user = new User();
        user.setEmail(formData.get("email"));
        user.setUsername(formData.get("username"));
        user.setIsAdmin(false);
        user.setPassword(passwordEncoder.encode(formData.get("password")));

        // Save the user to the database
        userService.saveUser(user);
        LoginUser loginUser = new LoginUser(user.getUsername(),user.getEmail());
			return ResponseEntity.ok().body(loginUser);
    }
}