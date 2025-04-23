package com.AMS.Apartment_Management_System.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.AMS.Apartment_Management_System.Services.OtpService;
import com.AMS.Apartment_Management_System.Services.UserServiceImpl;
import com.AMS.Apartment_Management_System.entities.User;

@Controller
public class ResetPasswordController {

	private final UserServiceImpl userService;
	private final OtpService otpService;
	
	@Autowired
    public ResetPasswordController(UserServiceImpl userService, OtpService otpService) {
        this.userService = userService;
		this.otpService = otpService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(value = "/reset-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> formData) {
        User user = userService.getUserByEmail(formData.get("email"));
        System.out.println("Yes i am here and my email is " + formData.get("email"));
        if (user != null) {
            if (otpService.FPsendMail(user.getEmail())) {
                return ResponseEntity.ok().body("Successful");
            }
        }
        return ResponseEntity.badRequest().body("User not found");
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/verify-code")
    public ResponseEntity<?> forgotPasswordVerify(@RequestBody Map<String, String> formData) {
        String otp = formData.get("verificationCode");
        String email = formData.get("email");
        System.out.println("Hey I am here " + otp + " " + email);
        if (otpService.OTPVALIDATE(otp,email)) {
            return ResponseEntity.ok().body("Validated Successfully");
        }
        return ResponseEntity.badRequest().body("Invalid or Expired OTP");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/reset-password2")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> formData) {
        System.out.println("I am here" + formData.get("email") + " " + formData.get("password"));
        userService.resetPassword(formData.get("email"), formData.get("password"));
        return ResponseEntity.ok().body("Successful");
    }
}
