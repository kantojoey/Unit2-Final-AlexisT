package com.example.hit_record_backend.controllers;

import com.example.hit_record_backend.dto.request.PostRequestDTO;
import com.example.hit_record_backend.dto.request.PostUpdateDTO;
import com.example.hit_record_backend.dto.response.PostResponseDTO;
import com.example.hit_record_backend.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // Get all posts from user using formatted response DTO
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostResponseDTO>> getAllPosts(@PathVariable Long userId){
        return ResponseEntity.ok(postService.getAllPosts(userId));
    }

    // Get a post by the post id
    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> getPostById(@PathVariable Long id){
        return ResponseEntity.ok(postService.getPostById(id));
    }

    // Creates post
    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost(@RequestBody PostRequestDTO submission){
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.createPost(submission));
    }

    // Updates post
    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDTO> updatePost(@PathVariable Long id, @RequestBody PostUpdateDTO updatedPost){
        return ResponseEntity.ok(postService.updatePost(id, updatedPost));
    }

    // Deletes post
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id){
        postService.deletePost(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
