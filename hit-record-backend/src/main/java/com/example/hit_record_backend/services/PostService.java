package com.example.hit_record_backend.services;

import com.example.hit_record_backend.dto.request.AlbumRequestDTO;
import com.example.hit_record_backend.dto.request.PostRequestDTO;
import com.example.hit_record_backend.dto.request.PostUpdateDTO;
import com.example.hit_record_backend.dto.response.AlbumResponseDTO;
import com.example.hit_record_backend.dto.response.PostResponseDTO;
import com.example.hit_record_backend.models.Album;
import com.example.hit_record_backend.models.Post;
import com.example.hit_record_backend.models.User;
import com.example.hit_record_backend.repositories.AlbumRepository;
import com.example.hit_record_backend.repositories.PostRepository;
import com.example.hit_record_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AlbumRepository albumRepository;


    public List<PostResponseDTO> getAllPosts(Long userId) {

        // Gets all post entities
        List<Post> posts = postRepository.findByUserId(userId);
        // Creates new list of Post DTOs
        List<PostResponseDTO> responseList = new ArrayList<>();
        // Converts each post entity into a post DTO
        for (Post post : posts) {
            responseList.add(mapToDTO(post));
        }
        // Returns list of DTOs
        return responseList;
    }

    // Converts post entity to DTO for GET and POST methods
    private PostResponseDTO mapToDTO(Post post) {
        // Gets album associated with post entity
        Album album = post.getAlbum();
        // Converts album into DTO structure
        AlbumResponseDTO albumDTO = new AlbumResponseDTO(
                album.getTitle(),
                album.getArtist(),
                album.getYearReleased(),
                album.getNumberOfTracks(),
                album.getSpotifyAlbumId()
        );
        // Builds final post DTO
        return new PostResponseDTO(
                post.getId(),
                post.getRating(),
                post.getReviewText(),
                post.getCreatedAt(),
                post.getEditedAt(),
                albumDTO
        );
    }

    // Service portion to get a post by ID
    public PostResponseDTO getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return mapToDTO(post);
    }

    // Portion that handles post creation
    public PostResponseDTO createPost(PostRequestDTO request) {
        // Validates that the user exists
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Created null album entity to be set from request
        Album album = null;
        // Uses spotify album ID to check if the album exists in DB
        if (request.getAlbum() != null && request.getAlbum().getSpotifyAlbumId() != null) {
            album = albumRepository.findBySpotifyAlbumId(request.getAlbum().getSpotifyAlbumId())
                    .orElseGet(() -> {
                        // Creates new entity if album doesn't exist
                        Album newAlbum = new Album();
                        AlbumRequestDTO albumDTO = request.getAlbum();
                        newAlbum.setTitle(albumDTO.getTitle());
                        newAlbum.setArtist(albumDTO.getArtist());
                        newAlbum.setYearReleased(albumDTO.getYearReleased());
                        newAlbum.setNumberOfTracks(albumDTO.getNumberOfTracks());
                        newAlbum.setSpotifyAlbumId(albumDTO.getSpotifyAlbumId());
                        return albumRepository.save(newAlbum);
                    });
        } else {
            throw new RuntimeException("Album data is required");
        }

        // Create the post entity
        Post post = new Post();
        post.setRating(request.getRating());
        post.setReviewText(request.getReviewText());
        post.setUser(user);
        post.setAlbum(album);

        Post savedPost = postRepository.save(post);

        // Converts post entity to PostResponseDTO
        return mapToDTO(savedPost);
    }

    // Portion that handles post updates
    public PostResponseDTO updatePost(Long id, PostUpdateDTO updateRequest){
        // Verify post exists
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        // Update fields from PostUpdateDTO
        post.setRating(updateRequest.getRating());
        post.setReviewText(updateRequest.getReviewText());
        post.setEditedAt(LocalDateTime.now());
        // Save to postRepository
        Post updatedPost = postRepository.save(post);
        // Convert to PostResponseDTO
        return mapToDTO(updatedPost);
    }

    // Portion that handles post deletions
    public void deletePost(Long id){
        if(!postRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found!");
        }
        postRepository.deleteById(id);
    }
}
