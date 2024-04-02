package com.news.application.controllers;

import com.news.application.models.User;
import com.news.application.repo.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class UsersController {

    @Autowired
    private UserRepository userRepository;

    private final Logger logger = LoggerFactory.getLogger(UsersController.class);

    @GetMapping("/users")
    public ResponseEntity<Object> getAllUsers(){
        try {
            Iterable<User> users = userRepository.findAll();
            return new ResponseEntity<Object>(users, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users/{name}")
    public ResponseEntity<Object> getUserByName(@PathVariable("name") String name) {
        try {
            if (!userRepository.existsByUserName(name)){
                return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
            }
            User user = userRepository.findByUserNameEquals(name).get();
            return new ResponseEntity<Object>(user, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/users")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        try {
            if (userRepository.existsByUserName(user.getUserName())){
                return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
            }
            User savedUser = userRepository.save(user);
            return new ResponseEntity<Object>(savedUser, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        try {
            user.setId(id);
            User savedUser = userRepository.save(user);
            return new ResponseEntity<Object>(savedUser, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users/{name}/exists")
    public ResponseEntity<Object> getIfUserExists(@PathVariable("name") String name) {
        try {
            return new ResponseEntity<Object>(userRepository.existsByUserName(name), HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }
}
