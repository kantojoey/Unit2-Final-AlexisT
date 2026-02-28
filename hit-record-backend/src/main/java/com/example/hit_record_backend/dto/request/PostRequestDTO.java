package com.example.hit_record_backend.dto.request;

public class PostRequestDTO {
    private Integer rating;
    private String reviewBodyText;
    private Long userId;
    private String spotifyAlbumId;

    public PostRequestDTO(Integer rating, String reviewBodyText, Long userId, String spotifyAlbumId){
        this.rating = rating;
        this.reviewBodyText = reviewBodyText;
        this.userId = userId;
        this.spotifyAlbumId = spotifyAlbumId;
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

    public String getSpotifyAlbumId() {
        return spotifyAlbumId;
    }

    public void setSpotifyAlbumId(String spotifyAlbumId) {
        this.spotifyAlbumId = spotifyAlbumId;
    }
}
