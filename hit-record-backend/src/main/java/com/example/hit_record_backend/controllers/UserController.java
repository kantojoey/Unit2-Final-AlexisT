package com.example.hit_record_backend.controllers;

import com.example.hit_record_backend.dto.request.UserLoginDTO;
import com.example.hit_record_backend.dto.request.UserRegistrationDTO;
import com.example.hit_record_backend.dto.response.UserResponseDTO;
import com.example.hit_record_backend.repositories.UserRepository;
import com.example.hit_record_backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // Reconfigured!!!
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Reconfigured!!!
    @GetMapping("id/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // Reconfigured!!!
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody UserRegistrationDTO user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));
    }

    // Reconfigured!!!
    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> loginRequest(@RequestBody UserLoginDTO loginInfo) {
      return ResponseEntity.ok(userService.loginRequest(loginInfo));
    }

    // Reconfigured!!!
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
