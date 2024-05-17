package com.news.application.repo;


import com.news.application.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest()
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class UserRepositoryTest {

    @Autowired private UserRepository userRepository;

    @Test
    @Sql("/scripts/USER_REPOSITORY_TEST.sql")
    void shouldReturnTrueForExistingUser() {
        boolean mustBeTrue = userRepository.existsByUserName("hippomaru@ya.ru");
        assertTrue(mustBeTrue);
    }

    @Test
    @Sql("/scripts/USER_REPOSITORY_TEST.sql")
    void shouldReturnFalseForNotExistingUser() {
        boolean mustBeFalse = userRepository.existsByUserName("Pikachu@s.ru");
        assertFalse(mustBeFalse);
    }

    @Test
    @Sql("/scripts/USER_REPOSITORY_TEST.sql")
    void shouldFindUser() {
        Optional<User> user = userRepository.findByUserNameEquals("hippomaru@ya.ru");
        assertFalse(user.isEmpty());
    }
}
