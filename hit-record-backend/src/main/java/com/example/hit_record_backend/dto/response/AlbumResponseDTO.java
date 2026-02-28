package com.example.hit_record_backend.dto.response;

public class AlbumResponseDTO {

    private String title;
    private String artist;
    private Integer yearReleased;
    private Integer numberOfTracks;
    private String spotifyAlbumId;

    public AlbumResponseDTO(String title, String artist, Integer yearReleased, Integer numberOfTracks, String spotifyAlbumId) {
        this.title = title;
        this.artist = artist;
        this.yearReleased = yearReleased;
        this.numberOfTracks = numberOfTracks;
        this.spotifyAlbumId = spotifyAlbumId;
    }

    public AlbumResponseDTO(){}

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

    public String getSpotifyAlbumId() {
        return spotifyAlbumId;
    }

    public void setSpotifyAlbumId(String spotifyAlbumId) {
        this.spotifyAlbumId = spotifyAlbumId;
    }
}

