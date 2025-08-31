package com.example.InventoryManagement.Services;

import com.example.InventoryManagement.Entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {
    Product saveProduct(Product product);
    List<Product> getAllProducts();
    Optional<Product> getProductById(String id);
    Product updateProduct(String id, Product product);
    void deleteProduct(String id);
}
