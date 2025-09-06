package com.example.Suprabhat_095.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class Suprabhat_095Service {
	
	List<String> products = new ArrayList<>();

	
	public String addProducts(String product) {
		this.products.add(product);
		return "Products added successfully";
		
	}

	public List<String> getProducts() {
		return this.products;

	}
}
