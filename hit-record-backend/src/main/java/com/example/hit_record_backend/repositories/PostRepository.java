package com.example.hit_record_backend.repositories;

import com.example.hit_record_backend.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
