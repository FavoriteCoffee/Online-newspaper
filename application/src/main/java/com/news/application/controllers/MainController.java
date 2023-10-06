package com.news.application.controllers;

import com.news.application.models.Post;
import com.news.application.models.User;
import com.news.application.repo.PostRepository;
import com.news.application.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;
    @GetMapping("/news")
    public String news(Model model){
        Iterable<Post> posts = postRepository.findAll();
        model.addAttribute("title", "NewsPage");
        model.addAttribute("posts", posts);
        return "news";
    }
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "HomePage");
        return "home";
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("title", "Login");
        return "login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("title", "Register");
        return "register";
    }
}