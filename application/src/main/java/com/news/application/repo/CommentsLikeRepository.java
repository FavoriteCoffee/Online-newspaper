package com.news.application.repo;

import com.news.application.models.Comment;
import com.news.application.models.CommentsLike;
import org.springframework.data.repository.CrudRepository;

public interface CommentsLikeRepository extends CrudRepository<CommentsLike, Long> {

}