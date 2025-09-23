package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Users;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/users")
	public List<Users> getAllUsers(){
		return userService.getAllUsers();
	}
	
	@PostMapping("/user")
	public Users addUser(@RequestBody Users users) {
		return userService.addUser(users);
	}
	
	@PutMapping("/editUser/{id}")
	public Users editUser(@PathVariable long id, @RequestBody Users users) {
		return userService.editUser(id, users);
	}
	
	@DeleteMapping("/deleteUser/{id}")
	public void deleteUser(@PathVariable long id) {
		userService.deleteUser(id);
	}
}
