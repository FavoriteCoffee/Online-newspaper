package com.news.application.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy="author", cascade = CascadeType.ALL)
    private List<Post> posts;

    @OneToMany(mappedBy="author", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy="author", cascade = CascadeType.ALL)
    private List<CommentsLike> commentsLikes;
    @OneToMany(mappedBy="author", cascade = CascadeType.ALL)
    private List<PostsLike> postsLikes;

    public List<CommentsLike> getCommentsLikes() {
        return commentsLikes;
    }

    public void setCommentsLikes(List<CommentsLike> commentsLikes) {
        this.commentsLikes = commentsLikes;
    }

    public List<PostsLike> getPostsLikes() {
        return postsLikes;
    }

    public void setPostsLikes(List<PostsLike> postsLikes) {
        this.postsLikes = postsLikes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
