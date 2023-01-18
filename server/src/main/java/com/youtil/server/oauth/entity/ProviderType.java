package com.youtil.server.oauth.entity;

import lombok.Getter;

@Getter
public enum ProviderType {
    GOOGLE,
    GITHUB,
    FACEBOOK,
    NAVER,
    KAKAO,
    LOCAL;
}