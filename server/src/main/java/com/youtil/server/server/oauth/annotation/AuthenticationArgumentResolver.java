package com.youtil.server.server.oauth.annotation;

import com.youtil.server.oauth.token.AuthTokenProvider;
import com.youtil.server.utils.HeaderUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@Component
@Slf4j
public class AuthenticationArgumentResolver implements HandlerMethodArgumentResolver {

    private final AuthTokenProvider authTokenProvider;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterAnnotation(AuthenticationPrincipal1.class) != null;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        return null;
    }

//    @Override
//    public CurrentUser resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
//                                       HttpServletRequest webRequest, WebDataBinderFactory binderFactory) {
//        String accessToken = HeaderUtil.getAccessToken(webRequest);
//        Claims claims = authTokenProvider.getAuthentication(accessToken);
//        Long userId = claims.get("id", Long.class);
//        return new CurrentUser(userId);
//    }

}