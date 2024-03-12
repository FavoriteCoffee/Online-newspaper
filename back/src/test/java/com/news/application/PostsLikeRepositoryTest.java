package com.news.application;
import com.news.application.models.PostsLike;
import com.news.application.repo.PostsLikeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest()
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
class PostsLikeRepositoryTest {

    @Autowired private PostsLikeRepository postsLikeRepository;

    @Test
    @Sql("/scripts/POSTS_LIKE_REPOSITORY_TEST.sql")
    void shouldReturnThreeSuitablePostsLikes() {
        List<PostsLike> postsLikes  = postsLikeRepository.findByPostId((long) 102);
        assertEquals(3, postsLikes.size());
    }
}
