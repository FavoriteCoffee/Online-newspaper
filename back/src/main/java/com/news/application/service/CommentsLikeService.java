package com.news.application.service;
import com.news.application.model.Comment;
import com.news.application.model.CommentsLike;
import com.news.application.model.User;
import com.news.application.repo.CommentsLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentsLikeService {
    private final CommentsLikeRepository commentsLikeRepository;

    public List<CommentsLike> findByCommentId(Long id){
        return commentsLikeRepository.findByCommentId(id);
    }

    public CommentsLike findById(Long id) throws Exception {
        return commentsLikeRepository.findById(id)
                .orElseThrow(() -> new Exception("Лайк комментария не найден"));
    }

    public CommentsLike createCommentsLike(Comment comment, User author){
        CommentsLike like = new CommentsLike();
        like.setComment(comment);
        like.setAuthor(author);
        return commentsLikeRepository.save(like);
    }

    public void deleteById(Long id){
        commentsLikeRepository.deleteById(id);
    }
}
