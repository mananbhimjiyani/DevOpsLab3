package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Users;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public List<Users> getAllUsers() {
		return userRepository.findAll();
	}
	
	public Users addUser(Users users) {
		return userRepository.save(users);
	}
	
	public Users editUser(Long id, Users users) {
		if(userRepository.existsById(id)) {
			users.setEmail(users.getEmail());
			users.setName(users.getName());
			return userRepository.save(users);
		}
		System.out.println("User does not exist");
		return null;
	}
	
	public void deleteUser(Long id) {
		if(userRepository.existsById(id)) {
			userRepository.deleteById(id);
		}
		else {
			System.out.println("Users with ID " + id + "does not exist.");
		}
	}
	
}
