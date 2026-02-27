package com.example.hit_record_backend.controllers;

import com.example.hit_record_backend.dto.request.UserLoginDTO;
import com.example.hit_record_backend.dto.request.UserRegistrationDTO;
import com.example.hit_record_backend.dto.response.UserResponseDTO;
import com.example.hit_record_backend.models.User;
import com.example.hit_record_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream().map(user -> new UserResponseDTO(user.getId(), user.getFirstName(), user.getLastName(), user.getUsername())).collect(Collectors.toList());
    }


    // User Registration
    @PostMapping("/register")
    // Response Entity allows more control over the HTTP status message
    // newUser represents the user object being posted from front-end after the user registers on form
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserRegistrationDTO newUser) {
        // Optional lets us handle if the user exists or doesn't exist
        // Uses custom search query from interface to find by the username to check if it exists in database
        Optional<User> existingUser = userRepository.findByUsername(newUser.getUsername().trim());

        // If the username is already in the database, it will return a conflict and return an error status
        // #TODO Need to set up logic on frontend to prevent user from registering if this status is received
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        // Otherwise, it will save the new user's info in the database
        User user = new User();
        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setUsername(newUser.getUsername());
        user.setPassword(newUser.getPassword());

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(new UserResponseDTO(savedUser.getId(), savedUser.getFirstName(), savedUser.getLastName(), savedUser.getUsername()));
    }

    // User Login
    @PostMapping("/login")
    // Use a DTO to only pass in the username and password rather than whole User object
    public ResponseEntity<UserResponseDTO> loginRequest(@RequestBody UserLoginDTO loginInfo) {
        // Verifies there is a User object with that username in the database to log in and sets it to userLogin variable
        Optional<User> userLogin = userRepository.findByUsername(loginInfo.getUsername().trim());

        // If the username isn't in database, userLogin will be an empty object
        // So if the userLogin object is empty, it returns an error status
        // #TODO Frontend must be set up to handle this error status so the user cannot log in to app and tell the user the username is wrong
        if(userLogin.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Returns entire User object and stores it in a variable
        // If userLogin was empty, an empty object gets stored
        User acceptedUser = userLogin.get();

        // Checks if the password in the database (object is now stored in acceptedUser) is equal to the password for the object passed in from the frontend (loginInfo)
        // If they don't match, it returns an unauthorized error message
        // The username may match but not the password so the user can still get this far
        //#TODO Frontend must be set up to handle this error status and tell the user the password is wrong
        if(!acceptedUser.getPassword().equals((loginInfo.getPassword()))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(new UserResponseDTO(acceptedUser.getId(), acceptedUser.getFirstName(), acceptedUser.getLastName(), acceptedUser.getUsername()));
    }

    // Get a user by ID
    @GetMapping("/id/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        Optional<User> userById = userRepository.findById(id);

        if(userById.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        User foundUser = userById.get();
        return ResponseEntity.ok(new UserResponseDTO(foundUser.getId(), foundUser.getFirstName(), foundUser.getLastName(), foundUser.getUsername()));
    }

    // Delete a user by ID
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        Optional<User> userById = userRepository.findById(id);

        if(userById.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        userRepository.deleteById(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
