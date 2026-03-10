package com.example.hit_record_backend.controllers;
import com.example.hit_record_backend.models.FavoriteAlbum;
import com.example.hit_record_backend.models.User;
import com.example.hit_record_backend.repositories.FavoriteAlbumRepository;
import com.example.hit_record_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoriteAlbumController {

    @Autowired
    private FavoriteAlbumRepository favoriteAlbumRepository;

    @Autowired
    private UserRepository userRepository;

    // Get all favorite albums by user ID
    @GetMapping("/user/{userId}")
    public List<FavoriteAlbum> getFavorites(@PathVariable Long userId) {
        return favoriteAlbumRepository.findByUserId(userId);
    }

    // Add new favorite album
    @PostMapping("/user/{userId}")
    public FavoriteAlbum addFavorite(@PathVariable Long userId, @RequestBody FavoriteAlbum favoriteAlbum) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        favoriteAlbum.setUser(user);
        return favoriteAlbumRepository.save(favoriteAlbum);
    }

//     Delete favorite album
    @DeleteMapping("/user/{userId}/{favoriteId}")
    public void deleteFavoriteAlbum(@PathVariable Long userId, @PathVariable Long favoriteId) {
        FavoriteAlbum favorite = favoriteAlbumRepository.findById(favoriteId)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        if (!favorite.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized delete");
        }

        favoriteAlbumRepository.delete(favorite);
//        favoriteAlbumRepository.deleteById(favoriteId);
    }

}
