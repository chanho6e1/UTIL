package com.youtil.server.security.oauth2;

import com.youtil.server.security.UserPrincipal;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class SignInSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Object user = authentication.getPrincipal(); //provided id
        System.out.println(user);

        //repository
        
        //repository 의존성 주입
        //dto 반환 
        //response.
        
        //response 넣어 200, 201
        
        //직렬화 printer writer class = 바디에 넣기
        PrintWriter writer = response.getWriter();
//        writer.print(json); //json화


    }
}
