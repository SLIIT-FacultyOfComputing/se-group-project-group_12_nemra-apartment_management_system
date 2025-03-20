package com.AMS.Apartment_Management_System.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.AMS.Apartment_Management_System.Services.UserServiceImpl;
import com.AMS.Apartment_Management_System.entities.User;

@Controller
public class SignupController {

    private final UserServiceImpl userService;

	@Autowired
    public SignupController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/signup")
    public String showSignupForm(Model model) {
        return "signup_page.html";
    }

    @PostMapping("/signup")
    public String processSignupForm(@ModelAttribute User user) {
		if (userService.userExists(user.getUsername(), user.getEmail())) {
			return "redirect:signup_page.html?error";
		}
        // Save the user to the database
        userService.saveUser(user);
        return "redirect:signup_success.html";
    }
}