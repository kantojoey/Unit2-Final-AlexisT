package com.example.hit_record_backend.dto.request;

// Fields that get updated from front end edit request
public class PostUpdateDTO {
    private Integer rating;
    private String reviewText;

    public PostUpdateDTO(Integer rating, String reviewText) {
        this.rating = rating;
        this.reviewText = reviewText;
    }

    public PostUpdateDTO(){}

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
}
