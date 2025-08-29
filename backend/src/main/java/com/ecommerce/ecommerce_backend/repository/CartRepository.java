package com.ecommerce.ecommerce_backend.repository;

import com.ecommerce.ecommerce_backend.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart, String> {
    Cart findByUsername(String username);
}