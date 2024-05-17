package com.news.application.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
    private String name;
    private String surname;
    private String username;
    private String password;
}
