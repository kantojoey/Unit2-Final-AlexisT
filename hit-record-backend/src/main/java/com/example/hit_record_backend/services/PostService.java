package com.example.hit_record_backend.services;

import com.example.hit_record_backend.dto.request.PostRequestDTO;
import com.example.hit_record_backend.dto.request.PostUpdateDTO;
import com.example.hit_record_backend.dto.response.AlbumResponseDTO;
import com.example.hit_record_backend.dto.response.PostResponseDTO;
import com.example.hit_record_backend.models.Album;
import com.example.hit_record_backend.models.Post;
import com.example.hit_record_backend.models.User;
import com.example.hit_record_backend.repositories.PostRepository;
import com.example.hit_record_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;


    public List<PostResponseDTO> getAllPosts() {

        // Gets all post entities
        List<Post> posts = postRepository.findAll();
        // Creates new list of Post DTOs
        List<PostResponseDTO> responseList = new ArrayList<>();
        // Converts each post entity into a post DTO
        for (Post post : posts) {
            responseList.add(mapToDTO(post));
        }
        // Returns list of DTOs
        return responseList;
    }

    // Converts post entity to DTO
    private PostResponseDTO mapToDTO(Post post) {
        // Gets album from database associated with post entity
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
                post.getReviewBodyText(),
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
        // Validates user id exists in database
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        //Creates new post and sets values from PostRequestDTO
        Post post = new Post();
        post.setRating(request.getRating());
        post.setReviewBodyText(request.getReviewBodyText());
        post.setUser(user);
        // Saves post to repository
        Post savedPost = postRepository.save(post);
        // Converts post entity to DTO
        return mapToDTO(savedPost);
    }

    // Portion that handles post updates
    public PostResponseDTO updatePost(Long id, PostUpdateDTO updateRequest){
        // Verify post exists
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        // Update fields from PostUpdateDTO
        post.setRating(updateRequest.getRating());
        post.setReviewBodyText(updateRequest.getReviewBodyText());
        post.setEditedAt(LocalDateTime.now());
        // Save to postRepository
        Post updatedPost = postRepository.save(post);
        // Convert to PostResponseDTO
        return mapToDTO(updatedPost);
    }

    // Portion that handles post deletions
    public void deletePost(Long id){
        if(!postRepository.existsById(id)){
            throw new RuntimeException("Post not found!");
        }
        postRepository.deleteById(id);
    }
}
