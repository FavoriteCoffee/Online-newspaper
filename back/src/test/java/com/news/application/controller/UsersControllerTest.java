package com.news.application.controller;

import com.news.application.model.Role;
import com.news.application.model.User;
import com.news.application.repo.UserRepository;
import com.news.application.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UsersControllerTest {

    @InjectMocks
    UsersController usersController;

    @Mock
    UserService userService;

    @Test
    public void getAllUsersTest(){
        User user1 = new User();
        User user2 = new User();
        user2.setUserName("Ivan");
        User user3 = new User();
        user3.setRole(Role.ROLE_ADMIN);

        when(userService.findAll()).thenReturn(Arrays.asList(user1, user2, user3));

        ResponseEntity<Object> result = usersController.getAllUsers();
        assertThat(result.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        assertThat(((List<?>) Objects.requireNonNull(result.getBody())).size())
                .isEqualTo(3);
        assertThat(((User)((List<?>) Objects.requireNonNull(result.getBody())).get(1)).getUsername())
                .isEqualTo("Ivan");
        assertThat(((User)((List<?>) Objects.requireNonNull(result.getBody())).get(2)).getRole())
                .isEqualTo(Role.ROLE_ADMIN);
    }

    @Test
    public void createUserTest() throws Exception {
        User user1 = new User();
        user1.setUserName("Ivan");
        user1.setRole(Role.ROLE_ADMIN);
        User user2 = new User();
        user2.setUserName("Boris");

        when(userService.createUser(user1)).thenReturn(user1);
        when(userService.createUser(user2)).thenThrow(new Exception("Пользователь с таким именем уже существует"));

        ResponseEntity<Object> result1 = usersController.createUser(user1);
        assertThat(result1.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        assertThat(((User) Objects.requireNonNull(result1.getBody())).getUsername())
                .isEqualTo("Ivan");
        assertThat(((User) Objects.requireNonNull(result1.getBody())).getRole())
                .isEqualTo(Role.ROLE_ADMIN);


        ResponseEntity<Object> result2 = usersController.createUser(user2);
        assertThat(result2.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
}
