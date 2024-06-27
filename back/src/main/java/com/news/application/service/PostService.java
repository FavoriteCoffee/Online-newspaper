package com.news.application.service;

import com.news.application.model.Category;
import com.news.application.model.Post;
import com.news.application.repo.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public Post addCategoryToPost(Long id, Category category) throws Exception {
        Post post = findById(id);
        System.out.println(post.getId());
        post.addCategory(category);
        return postRepository.save(post);
    }

    public Iterable<Category> getCategories(Long id) throws Exception {
        Post post = findById(id);
        return post.getCategories();
    }

    public void deleteById(Long id){
        postRepository.deleteById(id);
    }

    public Iterable<Post> findByCategory(Category category){
        return postRepository.findByCategoriesContains(category);
    }

    public Iterable<Post> findByCategories(List<Category> categories){
        Iterator<Post> iter = findRecent().iterator();
        Set<Long> postsIdSet = new HashSet<>();
        iter.forEachRemaining((x) -> postsIdSet.add(x.getId()));
        Set<Long> tempSet = new HashSet<>();
        System.out.println(categories);
        for (Category category : categories){
            System.out.println("POSTS:");
            postsIdSet.forEach(System.out::println);
            System.out.println();
            iter = postRepository.findByCategoriesContains(category).iterator();
            iter.forEachRemaining((x -> tempSet.add(x.getId())));
            System.out.println("TEMPSET:");
            tempSet.forEach(System.out::println);
            postsIdSet.retainAll(tempSet);
            tempSet.clear();
        }
        Set<Post> postsSet = new HashSet<>();
        postsIdSet.forEach((x -> {
            try {
                postsSet.add(findById(x));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }));
        return postsSet;
    }
}
