package com.example.hit_record_backend.dto.response;

import java.time.LocalDateTime;

public class PostResponseDTO {
    private Long id;
    private Integer rating;
    private String reviewBodyText;
    private LocalDateTime createdAt;
    private LocalDateTime editedAt;
    private AlbumResponseDTO album;

    public PostResponseDTO(Long id, Integer rating, String reviewBodyText, LocalDateTime createdAt, LocalDateTime editedAt, AlbumResponseDTO album) {
        this.id = id;
        this.rating = rating;
        this.reviewBodyText = reviewBodyText;
        this.createdAt = createdAt;
        this.editedAt = editedAt;
        this.album = album;
    }

    public PostResponseDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReviewBodyText() {
        return reviewBodyText;
    }

    public void setReviewBodyText(String reviewBodyText) {
        this.reviewBodyText = reviewBodyText;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getEditedAt() {
        return editedAt;
    }

    public void setEditedAt(LocalDateTime editedAt) {
        this.editedAt = editedAt;
    }

    public AlbumResponseDTO getAlbum() {
        return album;
    }

    public void setAlbum(AlbumResponseDTO album) {
        this.album = album;
    }
}
