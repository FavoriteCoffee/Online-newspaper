package com.news.application.repo;

import com.news.application.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUserNameEquals(String userName);
    boolean existsByUserName(String username);
}
