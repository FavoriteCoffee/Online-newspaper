package com.news.application.controllers;

import com.news.application.models.User;
import com.news.application.repo.UserRepository;
import com.news.application.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Set;

@Controller
public class UsersController {
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userDetailsServiceImpl);
        return provider;
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        String password = user.getPassword();
        String newPassword = passwordEncoder.encode(password);
        String username = user.getUserName();
        String roles = user.getRoles();

        User newUser = new User();
        newUser.setUserName(username);
        newUser.setPassword(newPassword);
        newUser.setRoles(roles);

        return userDetailsServiceImpl.addUser(newUser);
    }
}
