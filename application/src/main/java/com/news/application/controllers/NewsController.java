package com.news.application.controllers;

import com.news.application.models.Post;
import com.news.application.models.User;
import com.news.application.repo.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class NewsController {
    @Autowired
    private PostRepository postRepository;
    @PostMapping(path="/add_post")
    public @ResponseBody String addNewPost (@RequestParam String title
            , @RequestParam String text) {
        Post p = new Post();
        p.setTitle(title);
        p.setText(text);
        postRepository.save(p);
        return "saved";
    }

    @GetMapping(path="/get_all_posts")
    public @ResponseBody Iterable<Post> getAllPosts() {
        // This returns a JSON or XML with the users
        return postRepository.findAll();
    }
}
