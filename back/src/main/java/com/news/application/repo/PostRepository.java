package com.news.application.repo;

import com.news.application.model.Category;
import com.news.application.model.Post;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface PostRepository extends CrudRepository<Post, Long> {
    List<Post> findByDateGreaterThan(Date date);
    List<Post> findByCategoriesContains(Category category);
}