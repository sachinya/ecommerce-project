package com.ecommerce.ecommerce_backend.repository;

import com.ecommerce.ecommerce_backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}