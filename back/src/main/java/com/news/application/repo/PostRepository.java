package com.news.application.repo;

import com.news.application.models.Post;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface PostRepository extends CrudRepository<Post, Long> {
    List<Post> findByDateGreaterThan(Date date);
}