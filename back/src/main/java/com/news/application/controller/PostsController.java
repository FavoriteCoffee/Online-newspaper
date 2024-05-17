package com.news.application.controller;

import com.news.application.model.*;
import com.news.application.repo.*;
import com.news.application.service.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PostsController {
    private PostService postService;

    private CommentService commentService;

    private PostsLikeService postsLikeService;

    private CommentsLikeService commentsLikeService;

    private UserService userService;

    private final Logger logger = LoggerFactory.getLogger(PostsController.class);

    @GetMapping("/posts")
    public ResponseEntity<Object> getAllPosts(){
        try {
            Iterable<Post> posts = postService.findAll();
            return new ResponseEntity<Object>(posts, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/recent")
    public ResponseEntity<Object> getRecentPosts(){
        try {
            List<Post> posts = postService.findRecent();
            return new ResponseEntity<Object>(posts, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Object> getPostById(@PathVariable("id") Long id) {
        try {
            Post post = postService.findById(id);
            return new ResponseEntity<Object>(post, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/posts")
    public ResponseEntity<Object> createPost(@RequestBody Post post) {
        try {
            Post savedPost = postService.createPost(post);
            return new ResponseEntity<Object>(savedPost, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<Object> updatePost(@PathVariable("id") Long id, @RequestBody Post post) {
        try {
            Post savedPost = postService.updatePost(id, post);
            return new ResponseEntity<Object>(savedPost, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable("id") Long id) {
        try {
            postService.deleteById(id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments")
    public ResponseEntity<Object> getAllComments(@PathVariable("post_id") Long post_id){
        try {
            List<Comment> comments = commentService.findByPostId(post_id);
            return new ResponseEntity<Object>(comments, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments/recent")
    public ResponseEntity<Object> getRecentComments(@PathVariable("post_id") Long post_id){
        try {
            List<Comment> comments = commentService.findByPostId(post_id);
            System.out.println(comments);
            return new ResponseEntity<Object>(comments.subList(Math.max(comments.size() - 3, 0), comments.size()), HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments/{comment_id}")
    public ResponseEntity<Object> getCommentById(@PathVariable("comment_id") Long comment_id) {
        try {
            Comment comment = commentService.findById(comment_id);
            return new ResponseEntity<Object>(comment, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/posts/{post_id}/post-comment-by-userid/{author_id}")
    public ResponseEntity<Object> createComment(@PathVariable("post_id") Long post_id, @PathVariable Long author_id, @RequestBody Comment comment) {
        try {
            Post post = postService.findById(post_id);
            User author = userService.findById(author_id);
            Comment savedComment = commentService.createComment(comment, post, author);
            return new ResponseEntity<Object>(savedComment, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/posts/{post_id}/comments/{comment_id}")
    public ResponseEntity<Object> updateComment(@PathVariable("comment_id") Long comment_id, @RequestBody Comment comment) {
        try {
            Comment savedComment = commentService.updateComment(comment_id, comment);
            return new ResponseEntity<Object>(savedComment, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/posts/{post_id}/comments/{comment_id}")
    public ResponseEntity<HttpStatus> deleteComment(@PathVariable("comment_id") Long comment_id) {
        try {
            commentService.deleteById(comment_id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/likes")
    public ResponseEntity<Object> getAllPostsLikes(@PathVariable("post_id") Long post_id){
        try {
            List<PostsLike> likes = postsLikeService.findByPostId(post_id);
            return new ResponseEntity<Object>(likes, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/likes/{like_id}")
    public ResponseEntity<Object> getPostsLikeById(@PathVariable("post_id") Long post_id, @PathVariable("like_id") Long like_id) {
        try {
            PostsLike like = postsLikeService.findById(like_id);
            return new ResponseEntity<Object>(like, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/posts/{post_id}/likes")
    public ResponseEntity<Object> createPostsLike(@PathVariable("post_id") Long post_id, @RequestBody String name) {
        try {
            User author = userService.getByUsername(name);
            Post post = postService.findById(post_id);
            PostsLike savedLike = postsLikeService.createPostsLike(post, author);
            return new ResponseEntity<Object>(savedLike, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/posts/{post_id}/likes/{like_id}")
    public ResponseEntity<HttpStatus> deletePostsLike(@PathVariable("post_id") Long post_id, @PathVariable("like_id") Long like_id) {
        try {
            postsLikeService.deleteById(like_id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments/{comment_id}/likes")
    public ResponseEntity<Object> getAllCommentsLikes(@PathVariable("post_id") Long post_id, @PathVariable("comment_id") Long comment_id){
        try {
            List<CommentsLike> likes = commentsLikeService.findByCommentId(comment_id);
            return new ResponseEntity<Object>(likes, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments/{comment_id}/likes/{like_id}")
    public ResponseEntity<Object> getCommentsLikeById(@PathVariable("post_id") Long post_id, @PathVariable("comment_id") Long comment_id, @PathVariable("like_id") Long like_id) {
        try {
            CommentsLike like = commentsLikeService.findById(like_id);
            return new ResponseEntity<Object>(like, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/posts/{post_id}/comments/{comment_id}/likes")
    public ResponseEntity<Object> createCommentsLike(@PathVariable("post_id") Long post_id, @PathVariable("comment_id") Long comment_id, @RequestBody String name) {
        try {
            User author = userService.getByUsername(name);
            Comment comment = commentService.findById(comment_id);
            CommentsLike savedLike = commentsLikeService.createCommentsLike(comment, author);
            return new ResponseEntity<Object>(savedLike, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/posts/{post_id}/comments/{comment_id}/likes/{like_id}")
    public ResponseEntity<HttpStatus> deleteCommentsLike(@PathVariable("post_id") Long post_id, @PathVariable("comment_id") Long comment_id, @PathVariable("like_id") Long like_id) {
        try {
            commentsLikeService.deleteById(like_id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }
}