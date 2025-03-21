package com.AMS.Apartment_Management_System.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/signup")
    public String processSignupForm(@RequestParam Map<String, String> formData) {
		if (userService.userExists(formData.get("username"), formData.get("email"))) {
			return "redirect:signup_page.html?error";
		}
        User user = new User();
        user.setEmail(formData.get("email"));

        user.setUsername(formData.get("username"));

        user.setPassword(passwordEncoder.encode(formData.get("password")));

        // Save the user to the database
        userService.saveUser(user);
        return "successful";
    }
}