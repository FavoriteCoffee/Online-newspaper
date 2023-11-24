package com.news.application.repo;

import com.news.application.models.Comment;
import com.news.application.models.PostsLike;
import org.springframework.data.repository.CrudRepository;

public interface PostsLikeRepository extends CrudRepository<PostsLike, Long> {

}