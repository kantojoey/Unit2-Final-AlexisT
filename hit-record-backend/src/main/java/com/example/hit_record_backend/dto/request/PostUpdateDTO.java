package com.example.hit_record_backend.dto.request;

public class PostUpdateDTO {
    private Integer rating;
    private String reviewText;

    public PostUpdateDTO(){}

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
