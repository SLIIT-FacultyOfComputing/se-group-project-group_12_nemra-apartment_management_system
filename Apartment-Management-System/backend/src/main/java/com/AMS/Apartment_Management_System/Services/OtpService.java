package com.AMS.Apartment_Management_System.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationContext;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.AMS.Apartment_Management_System.repositories.UserRepository;

import java.security.SecureRandom;
@Service
public class OtpService {
    @Value("${spring.mail.username}")
    private String sender;

    private final JavaMailSender javaMailSender;
    private final otpCacheServices otpCacheService;
    private final SecureRandom random = new SecureRandom();

    @Autowired
    public OtpService(JavaMailSender javaMailSender, otpCacheServices otpCacheService) {
        this.javaMailSender = javaMailSender;
        this.otpCacheService = otpCacheService;
    }

    public String generateOtp(String userId) {
        String otp = String.format("%06d", random.nextInt(999999));
        otpCacheService.storeOtp(userId, otp);  // Cache via proxy
        return otp;
    }

    public boolean validateOtp(String userId, String otp) {
        String cachedOtp = otpCacheService.getOtp(userId);
        System.out.println("OTP in cache: " + cachedOtp);
        return cachedOtp != null && cachedOtp.equals(otp);
    }

    public void removeOtp(String userId) {
        otpCacheService.removeOtp(userId);
    }

    public Boolean FPsendMail(String email) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(email);
            String otp = generateOtp(email);
            mailMessage.setText(otp);
            javaMailSender.send(mailMessage);
            return true;
        } catch (Exception e) {
            System.out.println("Mail error: " + e);
            return false;
        }
    }

    public Boolean OTPVALIDATE(String otp, String email) {
        if (validateOtp(email, otp)) {
            removeOtp(email);
            return true;
        }
        return false;
    }
}
