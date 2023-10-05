package com.news.application.users;

import org.springframework.data.repository.CrudRepository;

import com.news.application.users.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}
