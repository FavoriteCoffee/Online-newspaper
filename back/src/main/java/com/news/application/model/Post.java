package com.news.application.model;

import com.news.application.service.CategoryService;
import jakarta.persistence.*;

import java.util.*;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "`Post`")
public class    Post {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "text")
    private String text;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "img")
    private String imgPath;

    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "post_category",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories=new HashSet<>();

    public void addCategory(Category category){
        this.categories.add(category);
        category.getPosts().add(this);
    }
    public void removeCategory(Category category){
        this.categories.remove(category);
        category.getPosts().remove(this);
    }
}
