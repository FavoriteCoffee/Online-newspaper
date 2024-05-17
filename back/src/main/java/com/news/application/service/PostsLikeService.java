package com.news.application.service;
import com.news.application.model.Post;
import com.news.application.model.PostsLike;
import com.news.application.model.User;
import com.news.application.repo.PostsLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostsLikeService {
    private final PostsLikeRepository postsLikeRepository;

    public List<PostsLike> findByPostId(Long id){
        return postsLikeRepository.findByPostId(id);
    }

    public PostsLike findById(Long id) throws Exception {
        return postsLikeRepository.findById(id)
                .orElseThrow(() -> new Exception("Лайк поста не найден"));
    }

    public PostsLike createPostsLike(Post post, User author){
        PostsLike like = new PostsLike();
        like.setPost(post);
        like.setAuthor(author);
        return postsLikeRepository.save(like);
    }

    public void deleteById(Long id){
        postsLikeRepository.deleteById(id);
    }
}
