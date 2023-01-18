package com.youtil.server.controller.user;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.domain.user.User;
import com.youtil.server.oauth.config.LoginUser;
import com.youtil.server.oauth.entity.SessionUser;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@RestController
public class UserController{

//    private final PostsService postsService;
    private final HttpSession httpSession;

//    @GetMapping("/")
//    public String index(Model model, @LoginUser SessionUser user) {
////        model.addAttribute("posts", postsService.findAllDesc());
//
////        SessionUser user = (SessionUser)httpSession.getAttribute("user");
//
//        if(user != null) {
//            model.addAttribute("userName", user.getName());
//            System.out.println(user.getEmail());
//        }
//
//        return "index";
//    }
    @ApiOperation(value = "로그인 사용자 정보", notes = "로그인 사용자 정보를 반환")
    @GetMapping
    public ResponseEntity<CommonResponse> getUser(@LoginUser SessionUser user) {

//        SessionUser user = (SessionUser) httpSession.getAttribute("user");

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "로그인 성공", user.getEmail()));
    }
}