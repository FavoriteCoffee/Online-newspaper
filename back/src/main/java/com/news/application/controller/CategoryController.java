package com.news.application.controller;

import com.news.application.model.Category;
import com.news.application.model.Post;
import com.news.application.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @PostMapping("/categories")
    public ResponseEntity<Object> createCategory(@RequestBody Category category) {
        try {
            Category savedCategory = categoryService.createCategory(category);
            return new ResponseEntity<Object>(savedCategory, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable("id") Long id) {
        try {
            categoryService.deleteById(id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<Object> getCategories() {
        try {
            Iterable<Category> allCategories = categoryService.getCategories();
            return new ResponseEntity<Object>(allCategories, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Object> updateCategory(@PathVariable("id") Long id, @RequestBody Category category) {
        try {
            Category savedCategory = categoryService.updateCategory(id, category);
            return new ResponseEntity<Object>(savedCategory, HttpStatus.OK);
        } catch(Exception ex) {
            logger.error(ex.getMessage(), ex);
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }
}
