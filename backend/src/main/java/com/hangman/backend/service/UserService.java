package com.hangman.backend.service;

import com.hangman.backend.model.User;
import com.hangman.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if(userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("User already exists");
        }
        return userRepository.save(user);
    }
}
