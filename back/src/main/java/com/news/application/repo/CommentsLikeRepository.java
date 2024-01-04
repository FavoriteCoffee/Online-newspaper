package com.news.application.repo;

import com.news.application.models.Comment;
import com.news.application.models.CommentsLike;
import com.news.application.models.PostsLike;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentsLikeRepository extends CrudRepository<CommentsLike, Long> {
    List<CommentsLike> findByCommentId(Long commentId);

}