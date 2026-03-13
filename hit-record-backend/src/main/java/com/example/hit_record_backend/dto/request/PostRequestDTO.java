package com.example.hit_record_backend.dto.request;

// Post structure when posted from front end
public class PostRequestDTO {
    private Integer rating;
    private String reviewText;
    private Long userId;
    private AlbumRequestDTO album;

    public PostRequestDTO(Integer rating, String reviewText, Long userId, AlbumRequestDTO album) {
        this.rating = rating;
        this.reviewText = reviewText;
        this.userId = userId;
        this.album = album;
    }

    public PostRequestDTO() {
    }

    // Getters + Setters
    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public AlbumRequestDTO getAlbum() {
        return album;
    }

    public void setAlbum(AlbumRequestDTO album) {
        this.album = album;
    }
}
