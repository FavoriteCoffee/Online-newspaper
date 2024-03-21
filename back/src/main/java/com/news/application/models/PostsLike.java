package com.news.application.models;

import jakarta.persistence.*;

@Entity
@Table(name = "`PostsLike`")
public class PostsLike {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fk_author_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "fk_post_id")
    private Post post;

    public Post getPost() {
        return post;
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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}