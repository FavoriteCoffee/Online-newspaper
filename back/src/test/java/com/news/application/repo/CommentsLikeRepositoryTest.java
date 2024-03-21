package com.news.application.repo;
import com.news.application.models.CommentsLike;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest()
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class CommentsLikeRepositoryTest {

    @Autowired private CommentsLikeRepository commentsLikeRepository;

    @Test
    @Sql("/scripts/COMMENTS_LIKE_REPOSITORY_TEST.sql")
    void shouldReturnTwoSuitableCommentsLikes() {
        List<CommentsLike> commentsLikes  = commentsLikeRepository.findByCommentId((long) 103);
        assertEquals(2, commentsLikes.size());
    }
}
