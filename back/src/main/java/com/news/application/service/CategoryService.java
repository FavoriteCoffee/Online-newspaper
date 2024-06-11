package com.news.application.service;

import com.news.application.model.Category;
import com.news.application.repo.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category createCategory(Category category){
        return categoryRepository.save(category);
    }

    public void deleteById(Long id){
        categoryRepository.deleteById(id);
    }

    public Iterable<Category> getCategories(){
        return categoryRepository.findAll();
    }
    public Category updateCategory(Long id, Category category){
        category.setId(id);
        return categoryRepository.save(category);
    }

    public Category findByName(String name){
        return categoryRepository.findByName(name);
    }
}
