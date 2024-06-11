package com.news.application.service;

import com.news.application.model.Category;
import com.news.application.model.Post;
import com.news.application.repo.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public Iterable<Post> findAll(){
        return postRepository.findAll();
    }

    public List<Post> findRecent(){
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -1);
        Date date = cal.getTime();
        return postRepository.findByDateGreaterThan(date);
    }

    public Post findById(Long id) throws Exception {
        return postRepository.findById(id)
                .orElseThrow(() -> new Exception("Пост не найден"));
    }

    public Post createPost(Post post){
        Calendar cal = Calendar.getInstance();
        Date date = cal.getTime();
        post.setDate(date);
        return postRepository.save(post);
    }

    public Post updatePost(Long id, Post post){
        post.setId(id);
        return postRepository.save(post);
    }

    public void deleteById(Long id){
        postRepository.deleteById(id);
    }

    public Iterable<Post> findByCategory(Category category){
        return postRepository.findByCategoriesContains(category);
    }
}
