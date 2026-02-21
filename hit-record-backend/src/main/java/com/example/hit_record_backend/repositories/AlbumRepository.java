package com.example.hit_record_backend.repositories;

import com.example.hit_record_backend.models.Album;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Long> {
}
