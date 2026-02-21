package com.example.hit_record_backend.controllers;


import com.example.hit_record_backend.models.Album;
import com.example.hit_record_backend.repositories.AlbumRepository;
import com.example.hit_record_backend.repositories.PostRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/album")
public class AlbumController {

    private final AlbumRepository albumRepository;

    private final PostRepository postRepository;

    public AlbumController(AlbumRepository albumRepository, PostRepository postRepository){
        this.albumRepository = albumRepository;
        this.postRepository = postRepository;
    }

    @GetMapping
    public List<Album> getAllAlbums(){
        return albumRepository.findAll();
    }

    @GetMapping("/{id}")
    public Album getAlbumById(@PathVariable Long id){
        return albumRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Album createAlbum(@RequestBody Album album){
        return albumRepository.save(album);
    }

    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable Long id){
        albumRepository.deleteById(id);
    }
}
