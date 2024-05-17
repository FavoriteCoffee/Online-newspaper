package com.news.application.model;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "`PostsLike`")
public class PostsLike {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fk_author_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "fk_post_id")
    private Post post;
}