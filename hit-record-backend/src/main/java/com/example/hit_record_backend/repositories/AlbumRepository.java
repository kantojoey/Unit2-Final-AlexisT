package com.example.hit_record_backend.repositories;

import com.example.hit_record_backend.models.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// Using Optional<> wrapper to protect against null values and verify the object exists in Service layer
// Creates custom call for an SQL query for spotify_album_id
public interface AlbumRepository extends JpaRepository<Album, Long> {
    Optional<Album> findBySpotifyAlbumId(String id);
}
