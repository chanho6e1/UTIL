package com.youtil.server.server.oauth.entity;

import com.youtil.server.domain.user.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {

    private Long id;

    private String name;
    private String email;
    private String picture;

    public SessionUser(User user) {
        this.id = user.getUserId();
        this.name = user.getUserName();
        this.email = user.getEmail();
        this.picture = user.getProfileImageUrl();
    }
}