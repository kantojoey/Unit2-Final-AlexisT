package com.example.hit_record_backend.dto.response;

public class UserSummaryDTO {
    private Long userId;
    private String username;

    public UserSummaryDTO(Long userId, String username) {
        this.userId = userId;
        this.username = username;
    }

    public UserSummaryDTO() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
