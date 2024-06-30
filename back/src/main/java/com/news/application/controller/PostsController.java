package com.news.application.controller;

import com.news.application.model.*;
import com.news.application.service.*;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.json.JSONParser;
import org.h2.util.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
public class PostsController {

    private final PostService postService;

    private final CommentService commentService;

    private final PostsLikeService postsLikeService;

    private final CommentsLikeService commentsLikeService;

    private final UserService userService;

    private final CategoryService categoryService;

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

    @GetMapping("posts/by_category/{category_name}")
    public ResponseEntity<Object> getPostsByCategory(@PathVariable("category_name") String category_name) {
        try {
            Category category = categoryService.findByName(category_name);
            Iterable<Post> posts = postService.findByCategory(category);
            return new ResponseEntity<Object>(posts, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("posts/by_categories")
    public ResponseEntity<Object> getPostsByCategories(@RequestParam(value = "categoryName") String[] categoryNames) {
        try {
            List<String> categoryNamesList = List.of(categoryNames);
            List<Category> categories = categoryService.findByNames(categoryNamesList);
            System.out.println(categories);
            Iterable<Post> posts = postService.findByCategories(categories);
            return new ResponseEntity<Object>(posts, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("posts/{post_id}/categories")
    public ResponseEntity<Object> getPostsCategories(@PathVariable("post_id") Long post_id) {
        try {
            Iterable<Category> categories = postService.getCategories(post_id);
            return new ResponseEntity<Object>(categories, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("posts/{post_id}/add_category/{category_name}")
    public ResponseEntity<Object> addCategoryToPost(@PathVariable("post_id") Long post_id, @PathVariable("category_name") String category_name) {
        try {
            Category category = categoryService.findByName(category_name);
            Post updatedPost = postService.addCategoryToPost(post_id, category);
            return new ResponseEntity<Object>(updatedPost, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }
}