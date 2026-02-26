package com.example.hit_record_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post {

    // Table columns
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer rating;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String reviewBodyText;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime editedAt;

    // Relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    // Relationship with Album
    @OneToOne(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Album album;

    // Constructors
    public Post(Long id, Integer rating, String reviewBodyText, LocalDateTime createdAt){
        this.id = id;
        this.rating = rating;
        this.reviewBodyText = reviewBodyText;
        this.createdAt = createdAt;
    }

    public Post(){}

    // Getters + Setters


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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    // Method to automatically set the createdAt time
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
