package com.example.hit_record_backend.controllers;

import com.example.hit_record_backend.dto.UserLoginDTO;
import com.example.hit_record_backend.models.User;
import com.example.hit_record_backend.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    // User Registration
    // #TODO Create user registration DTO in order to hide password in response body
    @PostMapping("/register")
    // Response Entity allows more control over the HTTP status message
    // newUser represents the user object being posted from front-end after the user registers on form
    public ResponseEntity<User> register(@RequestBody User newUser) {
        // Optional lets us handle if the user exists or doesn't exist
        // Uses custom search query from interface to find by the username to check if it exists in database
        Optional<User> existingUser = userRepository.findByUsername(newUser.getUsername().trim());

        // If the username is already in the database, it will return a conflict and return an error status
        // #TODO Need to set up logic on frontend to prevent user from registering if this status is received
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        // Otherwise, it will save the new user's info in the database
        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    // User Login
    @PostMapping("/login")
    // Use a DTO to only pass in the username and password rather than whole User object
    public ResponseEntity<User> loginRequest(@RequestBody UserLoginDTO loginInfo) {
        // Verifies there is a User object with that username in the database to log in and sets it to userAccount variable
        Optional<User> userAccount = userRepository.findByUsername(loginInfo.getUsername().trim());

        // If the username isn't in database, userAccount will be an empty object
        // So if the userAccount object is empty, it returns an error status
        // #TODO Frontend must be set up to handle this error status so the user cannot log in to app and tell the user the username is wrong
        if(userAccount.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Returns entire User object and stores it in a variable
        // If userAccount was empty, an empty object gets stored
        User loggedInUser = userAccount.get();

        // Checks if the password in the database (object is now stored in loggedInUser) is equal to the password for the object passed in from the frontend (loginInfo)
        // If they don't match, it returns an unauthorized error message
        // The username may match but not the password so the user can still get this far
        //#TODO Frontend must be set up to handle this error status and tell the user the password is wrong
        if(!loggedInUser.getPassword().equals((loginInfo.getPassword()))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(loggedInUser);
    }
    //#TODO rename variables for better clarity

    @GetMapping("/id/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/id/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
