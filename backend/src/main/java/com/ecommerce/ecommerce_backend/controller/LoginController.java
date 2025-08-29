package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.model.User;
import com.ecommerce.ecommerce_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Map<String, Object> login(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        Map<String, Object> response = new HashMap<>();

        User user = userRepository.findByUsername(username);
        if (user == null) {
            // First time user, register
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(password);
            userRepository.save(newUser);
            response.put("message", "User registered and logged in");
            response.put("firstTime", true);
        } else if (user.getPassword().equals(password)) {
            // Existing user, login
            response.put("message", "Login successful");
            response.put("firstTime", false);
        } else {
            response.put("message", "Invalid credentials");
            response.put("error", true);
        }
        return response;
    }
}