package com.news.application.controllers;

import com.news.application.models.User;
import com.news.application.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Controller
public class UsersController {
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/register")
    public String getRegister(Model model){
        model.addAttribute("title", "Register");
        return "register";
    }

    @PostMapping("/register")
    public @ResponseBody String postRegister(@RequestParam String login
            , @RequestParam String password) {
        for(User user: userRepository.findAll()){
            if (Objects.equals(user.getUserName(), login)){
                return "error: login_is_already_used";
            }
        }
        User n = new User();
        n.setUserName(login);
        n.setPassword(password);
        userRepository.save(n);
        return "success";
    }

    @GetMapping("/login")
    public String getLogin(Model model){
        model.addAttribute("title", "Login");
        return "login";
    }

    @PostMapping("/login")
    public @ResponseBody String postLogin(@RequestParam String login
            , @RequestParam String password) {
        for(User user: userRepository.findAll()){
            if (Objects.equals(user.getUserName(), login)){
                if(Objects.equals(user.getPassword(), password)){
                    return "success";
                }
                return "error: wrong_password";
            }
        }
        return "error: wrong_login";
    }
}
