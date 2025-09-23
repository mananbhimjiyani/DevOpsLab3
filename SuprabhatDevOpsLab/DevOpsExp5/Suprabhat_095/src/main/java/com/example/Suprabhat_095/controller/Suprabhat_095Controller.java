package com.example.Suprabhat_095.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Suprabhat_095.service.MessageService;
import com.example.Suprabhat_095.service.Suprabhat_095Service;

@RestController
@RequestMapping("/api")
public class Suprabhat_095Controller {
	
	@Autowired
	MessageService msgservice;
	
	@Autowired
	Suprabhat_095Service service;
	
	@GetMapping("/")
	public String hello(){
		return msgservice.sendMessage();
		
	}
	@GetMapping("/products")
	public List<String> getProducts(){
		return service.getProducts();
	}
	
	@PostMapping("/products")
	public String addProduct(@RequestBody String product) {
		return service.addProducts(product);
	}
	
	
}
