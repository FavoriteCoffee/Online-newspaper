package com.news.application;


import com.news.application.repo.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest(
        properties = {
                "spring.test.database.replace=NONE",
                "spring.datasource.url=jdbc:tc:postgresql:16:///springboot"
        })
class UserRepositoryTest {

    @Autowired private UserRepository userRepository;

    @Test
    @Sql("/scripts/INIT_THREE_USERS.sql")
    void shouldReturnTrueForExistingUser() {
        boolean mustBeTrue = userRepository.existsByUserName("Ivan");
        assertTrue(mustBeTrue);
    }

    @Test
    @Sql("/scripts/INIT_THREE_USERS.sql")
    void shouldReturnFalseForNotExistingUser() {
        boolean mustBeFalse = userRepository.existsByUserName("Pikachu");
        assertFalse(mustBeFalse);
    }
}
