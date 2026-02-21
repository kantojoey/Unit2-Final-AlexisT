package com.example.hit_record_backend.repositories;

import com.example.hit_record_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
