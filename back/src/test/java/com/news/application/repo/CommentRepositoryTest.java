package com.news.application.repo;


import com.news.application.models.Comment;
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
class CommentRepositoryTest {

    @Autowired private CommentRepository commentRepository;

    @Test
    @Sql("/scripts/COMMENT_REPOSITORY_TEST.sql")
    void shouldReturnTwoSuitableComments() {
        List<Comment> comments  = commentRepository.findByPostId((long) 101);
        assertEquals(2, comments.size());
    }
}
