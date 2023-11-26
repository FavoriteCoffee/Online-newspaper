package com.news.application.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "text")
    private String text;

    @ManyToOne
    @JoinColumn(name = "fk_author_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "fk_post_id")
    private Post post;

    @OneToMany(mappedBy="comment", cascade = CascadeType.ALL)
    private List<CommentsLike> likes;

    public Post getPost() {
        return post;
    }

    public List<CommentsLike> getLikes() {
        return likes;
    }

    public void setLikes(List<CommentsLike> likes) {
        this.likes = likes;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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