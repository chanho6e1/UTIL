package com.youtil.server.payload;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
@Getter
public class SignUpRequest {
    @NotBlank
    private String name;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
    // Getters and Setters (Omitted for brevity)
}