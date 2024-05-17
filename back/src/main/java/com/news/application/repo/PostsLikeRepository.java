package com.news.application.repo;

import com.news.application.model.PostsLike;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostsLikeRepository extends CrudRepository<PostsLike, Long> {
    List<PostsLike> findByPostId(Long postId);

}