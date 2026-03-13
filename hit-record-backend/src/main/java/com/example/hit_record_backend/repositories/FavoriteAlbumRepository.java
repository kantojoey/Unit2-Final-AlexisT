package com.example.hit_record_backend.repositories;

import com.example.hit_record_backend.models.FavoriteAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FavoriteAlbumRepository extends JpaRepository <FavoriteAlbum, Long> {
    List<FavoriteAlbum> findByUserId(Long userId);
}
