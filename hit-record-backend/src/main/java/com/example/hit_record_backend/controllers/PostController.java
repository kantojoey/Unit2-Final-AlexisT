package com.example.hit_record_backend.controllers;

import com.example.hit_record_backend.models.Album;
import com.example.hit_record_backend.models.Post;
import com.example.hit_record_backend.models.User;
import com.example.hit_record_backend.repositories.PostRepository;
import com.example.hit_record_backend.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostRepository postRepository;

    private final UserRepository userRepository;

    public PostController(PostRepository postRepository, UserRepository userRepository){
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id){
        return postRepository.findById(id).orElse(null);
    }

//    @PostMapping
//    public Post createPost(@RequestBody Post post){
//        // Fetch managed user
//        User postUser = userRepository.findById(post.getUser().getId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        post.setUser(postUser);
//
//        // Ensure album is attached
//        Album album = post.getAlbum();
//        if (album == null) throw new RuntimeException("Album is required");
//        album.setPost(post);  // set owning side for JPA
//
//        // Save post (cascades album)
//        return postRepository.save(post);
//    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id){
        postRepository.deleteById(id);
    }
}
