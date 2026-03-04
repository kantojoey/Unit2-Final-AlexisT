package com.example.hit_record_backend.dto.request;

public class PostUpdateDTO {
    private Integer rating;
    private String reviewBodyText;

    public PostUpdateDTO(){}

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
}
