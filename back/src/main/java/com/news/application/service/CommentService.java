package com.news.application.service;
import com.news.application.model.Comment;
import com.news.application.model.Post;
import com.news.application.model.User;
import com.news.application.repo.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public List<Comment> findByPostId(Long id){
        return commentRepository.findByPostId(id);
    }

    public Comment findById(Long id) throws Exception {
        return commentRepository.findById(id)
                .orElseThrow(() -> new Exception("Комментарий не найден"));
    }

    public Comment createComment(Comment comment, Post post, User author){
        comment.setPost(post);
        comment.setAuthor(author);
        Calendar cal = Calendar.getInstance();
        Date date = cal.getTime();
        System.out.println(date);
        comment.setDate(date);
        commentRepository.save(comment);
        return comment;
    }

    public Comment updateComment(Long id, Comment comment){
        comment.setId(id);
        return commentRepository.save(comment);
    }

    public void deleteById(Long id){
        commentRepository.deleteById(id);
    }
}
