package com.ecommerce.ecommerce_backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from the backend!";
    }
    
    @GetMapping("/status")
    public String getStatus() {
        return "Backend is running successfully!";
    }
}
