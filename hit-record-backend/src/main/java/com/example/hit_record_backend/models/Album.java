package com.example.hit_record_backend.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "albums")
public class Album {

    // Table columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String spotifyAlbumId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String artist;

    @Column(nullable = false)
    private Integer yearReleased;

    @Column(nullable = false)
    private Integer numberOfTracks;

    // Relationship with Posts
    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();

    // Constructors
    public Album(Long id, String spotifyAlbumId,String title, String artist, Integer yearReleased, Integer numberOfTracks){
        this.id = id;
        this.spotifyAlbumId = spotifyAlbumId;
        this.title = title;
        this.artist = artist;
        this.yearReleased = yearReleased;
        this.numberOfTracks = numberOfTracks;
    }

    public Album(){}

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

    public Integer getYearReleased() {
        return yearReleased;
    }

    public void setYearReleased(Integer yearReleased) {
        this.yearReleased = yearReleased;
    }

    public Integer getNumberOfTracks() {
        return numberOfTracks;
    }

    public void setNumberOfTracks(Integer numberOfTracks) {
        this.numberOfTracks = numberOfTracks;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
