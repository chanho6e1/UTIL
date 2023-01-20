package com.youtil.server.server.oauth.annotation;

import lombok.Getter;

@Getter
public class CurrentUser {

    private Long id;

    public CurrentUser(Long id) {
        this.id = id;
    }
}
