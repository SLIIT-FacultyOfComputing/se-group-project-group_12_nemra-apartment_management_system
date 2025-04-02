package com.AMS.Apartment_Management_System.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.AMS.Apartment_Management_System.Services.UserServiceImpl;
import com.AMS.Apartment_Management_System.entities.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow this origin
public class LoginController {

	private final UserServiceImpl userService;

    @Autowired
    public LoginController(UserServiceImpl userService) {
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

	@PostMapping("/login")
	public ResponseEntity<?> processLogin(@RequestBody Map<String,String> data) {
		String username = data.get("username");
		String password = data.get("password");
		System.out.println("username: " + username);
		System.out.println("password: " + password);
		
		if (userService.validateAuthentication(username, password)) {
			User user = userService.getUserByUsername(username);
			LoginUser loginUser = new LoginUser(user.getUsername(),user.getEmail());
			return ResponseEntity.ok().body(loginUser);
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("User not Found");
		}
	}
}
