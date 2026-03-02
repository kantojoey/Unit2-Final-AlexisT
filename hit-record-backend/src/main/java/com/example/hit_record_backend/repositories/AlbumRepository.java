package com.example.hit_record_backend.repositories;

import com.example.hit_record_backend.models.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    Optional<Album> findBySpotifyAlbumId(String id);
}
