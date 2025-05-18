package com.AMS.Apartment_Management_System.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.AMS.Apartment_Management_System.entities.User;
import com.AMS.Apartment_Management_System.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserServiceImpl implements UserService {
	
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

	@Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
	public boolean validateAuthentication(String username, String password) {
		if (username == null || password == null) {
			return false;
		}
        User user = getUserByUsername(username);
		return user != null && bCryptPasswordEncoder.matches(password, user.getPassword());
    }

	@Override
	public User getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

    public boolean updateUserPassword(String username, String newPassword) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
			return false;
		}
		user.setPassword(bCryptPasswordEncoder.encode(newPassword));
		saveUser(user);
		return true;
    }

	@Override
	public boolean userExists(String username, String email) {
		return userRepository.findByUsernameAndEmail(username, email) != null;
	}

	@Override
	public boolean userExists(String username) {
		return userRepository.findByUsername(username) != null;
	}
	
	@Override
    public void resetPassword(String email, String password) {
        User user = userRepository.findByEmail(email);
        user.setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(user);
    }
}
