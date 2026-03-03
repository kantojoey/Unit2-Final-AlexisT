package com.example.hit_record_backend.services;

import com.example.hit_record_backend.dto.request.UserLoginDTO;
import com.example.hit_record_backend.dto.request.UserRegistrationDTO;
import com.example.hit_record_backend.dto.response.UserResponseDTO;
import com.example.hit_record_backend.models.User;
import com.example.hit_record_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Portion that returns all users
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream().map(user -> new UserResponseDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername())
        ).collect(Collectors.toList());
    }

    // Portion that gets user by ID
    public UserResponseDTO getUserById(Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!"));

        return new UserResponseDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername()
        );
    }

    // Portion that creates a new user
    public UserResponseDTO registerUser(UserRegistrationDTO newUser) {
        Optional<User> existingUser = userRepository.findByUsername(newUser.getUsername().trim());

        if (existingUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists!");
        }

        User user = new User();
        user.setFirstName(newUser.getFirstName().trim());
        user.setLastName(newUser.getLastName().trim());
        user.setUsername(newUser.getUsername().trim());
        user.setPassword(newUser.getPassword().trim());

        User savedUser = userRepository.save(user);
        return new UserResponseDTO(
                savedUser.getId(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getUsername()
        );
    }

    // User Login
    @PostMapping("/login")
    public UserResponseDTO loginRequest(UserLoginDTO loginInfo) {

        Optional<User> userLogin = userRepository.findByUsername(loginInfo.getUsername().trim());

        if(userLogin.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User acceptedUser = userLogin.get();

        if(!acceptedUser.getPassword().equals((loginInfo.getPassword()))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(new UserResponseDTO(acceptedUser.getId(), acceptedUser.getFirstName(), acceptedUser.getLastName(), acceptedUser.getUsername()));
    }
}
