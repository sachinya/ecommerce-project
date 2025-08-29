package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.model.Cart;
import com.ecommerce.ecommerce_backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/add")
    public Map<String, Object> addToCart(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String productId = payload.get("productId");

        Cart cart = cartRepository.findByUsername(username);
        if (cart == null) {
            cart = new Cart();
            cart.setUsername(username);
            cart.setProductIds(new ArrayList<>());
        }
        cart.getProductIds().add(productId);
        cartRepository.save(cart);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Product added to cart");
        response.put("cart", cart.getProductIds());
        return response;
    }

    @PostMapping("/remove")
    public Map<String, Object> removeFromCart(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String productId = payload.get("productId");

        Cart cart = cartRepository.findByUsername(username);
        if (cart != null) {
            cart.getProductIds().remove(productId);
            cartRepository.save(cart);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Product removed from cart");
        response.put("cart", cart != null ? cart.getProductIds() : Collections.emptyList());
        return response;
    }

    @GetMapping("/{username}")
    public List<String> getCart(@PathVariable String username) {
        Cart cart = cartRepository.findByUsername(username);
        if (cart != null) {
            return cart.getProductIds();
        }
        return new ArrayList<>();
    }
}