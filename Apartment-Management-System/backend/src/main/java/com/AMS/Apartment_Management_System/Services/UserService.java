package com.AMS.Apartment_Management_System.Services;

import com.AMS.Apartment_Management_System.entities.User;

public interface UserService {
	
	void saveUser(User user);

	User getUserByUsername(String username);

	User getUserByEmail(String email);

	boolean userExists(String username, String email);
	
	boolean userExists(String username);
	
	boolean validateAuthentication(String username, String password);

	public boolean updateUserPassword(String username, String newPassword);
}
