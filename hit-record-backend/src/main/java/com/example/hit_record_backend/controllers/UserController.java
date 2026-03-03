package com.example.hit_record_backend.controllers;

import com.example.hit_record_backend.dto.request.UserLoginDTO;
import com.example.hit_record_backend.dto.request.UserRegistrationDTO;
import com.example.hit_record_backend.dto.response.UserResponseDTO;
import com.example.hit_record_backend.models.User;
import com.example.hit_record_backend.repositories.UserRepository;
import com.example.hit_record_backend.services.UserService;
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

    @Autowired
    private UserService userService;

    // Reconfigured!!!
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("id/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody UserRegistrationDTO user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));
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
