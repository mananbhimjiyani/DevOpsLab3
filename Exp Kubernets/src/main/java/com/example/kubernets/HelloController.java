package com.example.kubernets;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String sayHello() {
        return "<h1>Hello from Kubernetes!</h1><p>This application was deployed by a Jenkins pipeline.</p>";
    }
}