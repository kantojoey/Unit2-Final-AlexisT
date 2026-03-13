package com.example.hit_record_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "favorite_albums", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "spotifyAlbumId"}))
public class FavoriteAlbum {
    // Table columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String spotifyAlbumId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String artist;

    @Column(nullable = false)
    private String imageUrl;

    // Relationship with users, many favorites for one user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    // Constructors
    public FavoriteAlbum(Long id, String spotifyAlbumId, String title, String artist, String imageUrl, User user) {
        this.id = id;
        this.spotifyAlbumId = spotifyAlbumId;
        this.title = title;
        this.artist = artist;
        this.imageUrl = imageUrl;
        this.user = user;
    }

    public FavoriteAlbum() {
    }

    // Getters + Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpotifyAlbumId() {
        return spotifyAlbumId;
    }

    public void setSpotifyAlbumId(String spotifyAlbumId) {
        this.spotifyAlbumId = spotifyAlbumId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
