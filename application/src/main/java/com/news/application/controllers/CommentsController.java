package com.news.application.controllers;

import com.news.application.models.Comment;
import com.news.application.models.Post;
import com.news.application.models.User;
import com.news.application.repo.CommentRepository;
import com.news.application.repo.PostRepository;
import org.hibernate.annotations.Comments;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentsController {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    private final Logger logger = LoggerFactory.getLogger(UsersController.class);

    @GetMapping("/posts/{post_id}/comments")
    public ResponseEntity<Object> getAllComments(@PathVariable("post_id") Long post_id){
        try {
            Post post = postRepository.findById(post_id).get();
            List<Comments> comments = post.getComments();
            return new ResponseEntity<Object>(comments, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments/{comment_id}")
    public ResponseEntity<Object> getPostById(@PathVariable("comment_id") Long comment_id) {
        try {
            Comment comment = commentRepository.findById(comment_id).get();
            return new ResponseEntity<Object>(comment, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/posts/{post_id}/comments")
    public ResponseEntity<Object> createPost(@RequestBody Comment comment) {
        try {
            Comment savedComment = commentRepository.save(comment);
            return new ResponseEntity<Object>(savedComment, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/posts/{post_id}/comments/{comment_id}")
    public ResponseEntity<Object> updatePost(@PathVariable("comment_id") Long comment_id, @RequestBody Comment comment) {
        try {
            comment.setId(comment_id);
            Comment savedComment = commentRepository.save(comment);
            return new ResponseEntity<Object>(savedComment, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/posts/{post_id}/comments/{comment_id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("comment_id") Long comment_id) {
        try {
            commentRepository.deleteById(comment_id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }
}
