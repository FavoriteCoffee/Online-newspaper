package com.news.application.controllers;

import com.news.application.models.Post;
import com.news.application.models.User;
import com.news.application.repo.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/news")
public class NewsController {
    @Autowired
    private PostRepository postRepository;

    @GetMapping("")
    public String news(Model model){
        Iterable<Post> posts = postRepository.findAll();
        model.addAttribute("title", "News");
        model.addAttribute("posts", posts);
        return "news-main";
    }

    @GetMapping("/add")
    public String getNewsAdd(Model model){
        model.addAttribute("title", "News Add");
        return "news-add";
    }

    @PostMapping("/add")
    public @ResponseBody String postNewsAdd (@RequestParam String title
            , @RequestParam String text, @RequestParam Long authorId) {
        Post p = new Post();
        p.setTitle(title);
        p.setText(text);
        p.setAuthor_id(authorId);
        postRepository.save(p);
        return "saved";
    }
}
