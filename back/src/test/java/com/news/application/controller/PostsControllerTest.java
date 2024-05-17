package com.news.application.controller;

import com.news.application.model.Post;
import com.news.application.repo.PostRepository;
import com.news.application.service.PostService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PostsControllerTest {
    @InjectMocks
    PostsController postsController;

    @Mock
    PostService postService;


    @Test
    public void getAllPosts(){
        Post post1 = new Post();
        Post post2 = new Post();
        post2.setTitle("test title");
        Post post3 = new Post();
        post3.setText("test text");

        when(postService.findAll()).thenReturn(Arrays.asList(post1, post2, post3));

        ResponseEntity<Object> result = postsController.getAllPosts();
        assertThat(result.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        assertThat(((List<?>) Objects.requireNonNull(result.getBody())).size())
                .isEqualTo(3);
        assertThat(((Post)((List<?>) Objects.requireNonNull(result.getBody())).get(1)).getTitle())
                .isEqualTo("test title");
        assertThat(((Post)((List<?>) Objects.requireNonNull(result.getBody())).get(2)).getText())
                .isEqualTo("test text");
    }

    @Test
    public void getPostByIdTest () throws Exception {
        Post post = new Post();
        post.setId((long) 1);
        post.setTitle("test title");
        post.setText("test text");

        when(postService.findById(eq((long) 1))).thenReturn(Optional.of(post).get());
        when(postService.findById(eq((long) 2))).thenThrow(new NoSuchElementException());

        ResponseEntity<Object> result1 = postsController.getPostById((long) 1);
        assertThat(result1.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        assertThat(((Post) Objects.requireNonNull(result1.getBody())).getTitle())
                .isEqualTo("test title");
        assertThat(((Post) Objects.requireNonNull(result1.getBody())).getText())
                .isEqualTo("test text");

        ResponseEntity<Object> result2 = postsController.getPostById((long) 2);
        assertThat(result2.getStatusCode())
                .isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void createPostTest(){
        Post post = new Post();
        post.setId((long) 1);
        post.setTitle("test title");
        post.setText("test text");

        when(postService.createPost(any())).thenAnswer(i -> i.getArguments()[0]);

        ResponseEntity<Object> result = postsController.createPost(post);
        assertThat(result.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        assertThat(((Post) Objects.requireNonNull(result.getBody())).getTitle())
                .isEqualTo("test title");
        assertThat(((Post) Objects.requireNonNull(result.getBody())).getText())
                .isEqualTo("test text");
    }
}
