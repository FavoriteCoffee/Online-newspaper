package com.news.application.controllers;

import com.news.application.models.*;
import com.news.application.repo.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
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

    @Autowired
    private UserRepository userRepository;

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

    @GetMapping("/posts/recent")
    public ResponseEntity<Object> getRecentPosts(){
        try {
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DATE, -1);
            Date date = cal.getTime();
            List<Post> posts = postRepository.findByDateGreaterThan(date);
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
            Calendar cal = Calendar.getInstance();
            Date date = cal.getTime();
            post.setDate(date);
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
            List<Comment> comments = commentRepository.findByPostId(post_id);
            return new ResponseEntity<Object>(comments, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/posts/{post_id}/comments/recent")
    public ResponseEntity<Object> getRecentComments(@PathVariable("post_id") Long post_id){
        try {
            List<Comment> comments = commentRepository.findByPostId(post_id);
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
            Comment comment = commentRepository.findById(comment_id).get();
            return new ResponseEntity<Object>(comment, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/posts/{post_id}/post-comment-by-userid/{author_id}")
    public ResponseEntity<Object> createComment(@PathVariable("post_id") Long post_id, @PathVariable Long author_id, @RequestBody Comment comment) {
        try {
            comment.setPost(postRepository.findById(post_id).get());
            comment.setAuthor(userRepository.findById(author_id).get());
            System.out.println(1);
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
            List<PostsLike> likes = postsLikeRepository.findByPostId(post_id);
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
    public ResponseEntity<Object> createPostsLike(@PathVariable("post_id") Long post_id, @RequestBody String name) {
        try {
            System.out.println(name);
            User author = userRepository.findByUserName(name).get();
            PostsLike like = new PostsLike();
            like.setPost(postRepository.findById(post_id).get());
            like.setAuthor(author);
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
            List<CommentsLike> likes = commentsLikeRepository.findByCommentId(comment_id);
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
    public ResponseEntity<Object> createCommentsLike(@PathVariable("post_id") Long post_id, @PathVariable("comment_id") Long comment_id, @RequestBody String name) {
        try {
            User author = userRepository.findByUserName(name).get();
            CommentsLike like = new CommentsLike();
            like.setComment(commentRepository.findById(comment_id).get());
            like.setAuthor(author);
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