package com.news.application.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Comments;

import java.util.List;

@Entity
public class    Post {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "text")
    private String text;

    @ManyToOne
    @JoinColumn(name = "fk_author_id")
    private User author;

    @OneToMany(mappedBy="post", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy="post", cascade = CascadeType.ALL)
    private List<PostsLike> likes;

    public List<PostsLike> getLikes() {
        return likes;
    }

    public void setLikes(List<PostsLike> likes) {
        this.likes = likes;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}
