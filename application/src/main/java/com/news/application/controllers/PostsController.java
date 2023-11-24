package com.news.application.controllers;

import com.news.application.models.Comment;
import com.news.application.models.CommentsLike;
import com.news.application.models.Post;
import com.news.application.models.PostsLike;
import com.news.application.repo.CommentRepository;
import com.news.application.repo.CommentsLikeRepository;
import com.news.application.repo.PostRepository;
import com.news.application.repo.PostsLikeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class PostsController {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostsLikeRepository postsLikeRepository;

    @Autowired
    private CommentsLikeRepository commentsLikeRepository;

    private final Logger logger = LoggerFactory.getLogger(PostsController.class);

    @GetMapping("/posts")
    public ResponseEntity<Object> getAllPosts(){
        try {
            Iterable<Post> posts = postRepository.findAll();
            return new ResponseEntity<Object>(posts, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Object> getPostById(@PathVariable("id") Long id) {
        try {
            Post post = postRepository.findById(id).get();
            return new ResponseEntity<Object>(post, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/posts")
    public ResponseEntity<Object> createPost(@RequestBody Post post) {
        try {
            Post savedPost = postRepository.save(post);
            return new ResponseEntity<Object>(savedPost, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<Object> updatePost(@PathVariable("id") Long id, @RequestBody Post post) {
        try {
            post.setId(id);
            Post savedPost = postRepository.save(post);
            return new ResponseEntity<Object>(savedPost, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable("id") Long id) {
        try {
            postRepository.deleteById(id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments")
    public ResponseEntity<Object> getAllComments(@PathVariable("post_id") Long post_id){
        try {
            Post post = postRepository.findById(post_id).get();
            List<Comment> comments = post.getComments();
            return new ResponseEntity<Object>(comments, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments/{comment_id}")
    public ResponseEntity<Object> getCommentById(@PathVariable("comment_id") Long comment_id) {
        try {
            Comment comment = commentRepository.findById(comment_id).get();
            return new ResponseEntity<Object>(comment, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/posts/{post_id}/comments")
    public ResponseEntity<Object> createComment(@RequestBody Comment comment) {
        try {
            Comment savedComment = commentRepository.save(comment);
            return new ResponseEntity<Object>(savedComment, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/posts/{post_id}/comments/{comment_id}")
    public ResponseEntity<Object> updateComment(@PathVariable("comment_id") Long comment_id, @RequestBody Comment comment) {
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
    public ResponseEntity<HttpStatus> deleteComment(@PathVariable("comment_id") Long comment_id) {
        try {
            commentRepository.deleteById(comment_id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/likes")
    public ResponseEntity<Object> getAllPostsLikes(@PathVariable("post_id") Long post_id){
        try {
            Post post = postRepository.findById(post_id).get();
            List<PostsLike> likes = post.getLikes();
            return new ResponseEntity<Object>(likes, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/likes/{like_id}")
    public ResponseEntity<Object> getPostsLikeById(@PathVariable("post_id") Long post_id, @PathVariable("like_id") Long like_id) {
        try {
            PostsLike like = postsLikeRepository.findById(like_id).get();
            return new ResponseEntity<Object>(like, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/posts/{post_id}/likes")
    public ResponseEntity<Object> createPostsLike(@PathVariable("post_id") Long post_id, @RequestBody PostsLike like) {
        try {
            PostsLike savedLike = postsLikeRepository.save(like);
            return new ResponseEntity<Object>(savedLike, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/posts/{post_id}/likes/{like_id}")
    public ResponseEntity<HttpStatus> deletePostsLike(@PathVariable("post_id") Long post_id, @PathVariable("like_id") Long like_id) {
        try {
            postsLikeRepository.deleteById(like_id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments/{comment_id}/likes")
    public ResponseEntity<Object> getAllCommentsLikes(@PathVariable("post_id") Long post_id, @PathVariable("comment_id") Long comment_id){
        try {
            Comment comment = commentRepository.findById(comment_id).get();
            List<CommentsLike> likes = comment.getLikes();
            return new ResponseEntity<Object>(likes, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments/{comment_id}/likes/{like_id}")
    public ResponseEntity<Object> getCommentsLikeById(@PathVariable("post_id") Long post_id, @PathVariable("comment_id") Long comment_id, @PathVariable("like_id") Long like_id) {
        try {
            CommentsLike like = commentsLikeRepository.findById(like_id).get();
            return new ResponseEntity<Object>(like, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/posts/{post_id}/comments/{comment_id}/likes")
    public ResponseEntity<Object> createCommentsLike(@PathVariable("post_id") Long post_id, @PathVariable("comment_id") Long comment_id, @RequestBody CommentsLike like) {
        try {
            CommentsLike savedLike = commentsLikeRepository.save(like);
            return new ResponseEntity<Object>(savedLike, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/posts/{post_id}/comments/{comment_id}/likes/{like_id}")
    public ResponseEntity<HttpStatus> deleteCommentsLike(@PathVariable("post_id") Long post_id, @PathVariable("comment_id") Long comment_id, @PathVariable("like_id") Long like_id) {
        try {
            commentsLikeRepository.deleteById(like_id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }
}