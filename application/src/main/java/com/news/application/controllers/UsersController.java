package com.news.application.controllers;

import com.news.application.models.User;
import com.news.application.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UsersController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/add_user")
    public @ResponseBody String addNewUser(@RequestParam String login
            , @RequestParam String password) {
        User n = new User();
        n.setLogin(login);
        n.setPassword(password);
        userRepository.save(n);
        return "saved";
    }

    @GetMapping(path="/get_all_users")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }
}
