package com.example.hit_record_backend.dto.request;

public class PostRequestDTO {
    private Integer rating;
    private String reviewBodyText;
    private Long userId;
    private AlbumRequestDTO album;

    public PostRequestDTO(Integer rating, String reviewBodyText, Long userId, AlbumRequestDTO album){
        this.rating = rating;
        this.reviewBodyText = reviewBodyText;
        this.userId = userId;
        this.album = album;
    }

    public PostRequestDTO(){}

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public AlbumRequestDTO getAlbum() { return album; }

    public void setAlbum(AlbumRequestDTO album) { this.album = album; }
}
