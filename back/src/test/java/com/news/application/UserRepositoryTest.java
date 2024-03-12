package com.news.application;


import com.news.application.models.User;
import com.news.application.repo.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest()
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired private UserRepository userRepository;

    @Test
    @Sql("/scripts/USER_REPOSITORY_TEST.sql")
    void shouldReturnTrueForExistingUser() {
        boolean mustBeTrue = userRepository.existsByUserName("Ivan");
        assertTrue(mustBeTrue);
    }

    @Test
    @Sql("/scripts/USER_REPOSITORY_TEST.sql")
    void shouldReturnFalseForNotExistingUser() {
        boolean mustBeFalse = userRepository.existsByUserName("Pikachu");
        assertFalse(mustBeFalse);
    }

    @Test
    @Sql("/scripts/USER_REPOSITORY_TEST.sql")
    void shouldFindUser() {
        Optional<User> user = userRepository.findByUserNameEquals("Ivan");
        assertFalse(user.isEmpty());
    }
}
