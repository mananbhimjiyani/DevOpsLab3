package com.example.Maven.DevOps;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/")
    public String sayHello() {
        return "<h1>Hello from Jenkins!</h1><p>This app was deployed automatically.</p>";
    }    
}
