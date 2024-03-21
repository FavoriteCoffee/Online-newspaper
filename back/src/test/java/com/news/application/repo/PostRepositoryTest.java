package com.news.application.repo;


import com.news.application.models.Post;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest()
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class PostRepositoryTest {

    @Autowired private PostRepository postRepository;

    @Test
    @Sql("/scripts/POST_REPOSITORY_TEST.sql")
    void shouldReturnTwoRecentPosts() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -1);
        Date date = cal.getTime();
        List<Post> posts  = postRepository.findByDateGreaterThan(date);
        assertEquals(2, posts.size());
    }
}
