package com.news.application.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "`Comment`")
public class Comment {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "date")
    @Temporal(TemporalType.TIMESTAMP)
    Date date;


    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "fk_author_id")
    private User author;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}