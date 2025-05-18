package com.AMS.Apartment_Management_System.Services;


import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class otpCacheServices {

    @CachePut(value = "otpCache", key = "#userId")
    public String storeOtp(String userId, String otp) {
        System.out.println("Storing OTP in cache for " + userId + ": " + otp);
        return otp;
    }

    @Cacheable(value = "otpCache", key = "#userId")
    public String getOtp(String userId) {
        System.out.println("Fetching OTP from cache for " + userId);
        return null;
    }

    @CacheEvict(value = "otpCache", key = "#userId")
    public void removeOtp(String userId) {
        System.out.println("Removed OTP for " + userId);
    }
}

