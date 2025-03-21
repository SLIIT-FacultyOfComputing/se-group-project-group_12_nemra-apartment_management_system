package com.AMS.Apartment_Management_System.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.AMS.Apartment_Management_System.Services.UserServiceImpl;

@Controller
public class ResetPasswordController {

	private final UserServiceImpl userService;
	
	@Autowired
    public ResetPasswordController(UserServiceImpl userService) {
        this.userService = userService;
    }

	@PostMapping("/reset-password")
	public String processResetPasswordForm(@RequestParam("username") String username,
										   @RequestParam("email") String email,
                               			   @RequestParam("newPassword") String newPassword) {
		// Check if the username and email exist and match in the database
		if (!userService.userExists(username, email)) {
			return "redirect:reset_password.html?error";
		}
		// Update the user's password in the database
		userService.updateUserPassword(username, newPassword);
		return "redirect:index.html";
	}
}
