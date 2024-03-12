package com.news.application;


import com.news.application.models.Comment;
import com.news.application.repo.CommentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest()
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
class CommentRepositoryTest {

    @Autowired private CommentRepository commentRepository;

    @Test
    @Sql("/scripts/COMMENT_REPOSITORY_TEST.sql")
    void shouldReturnTwoSuitableComments() {
        List<Comment> comments  = commentRepository.findByPostId((long) 101);
        assertEquals(2, comments.size());
    }
}
