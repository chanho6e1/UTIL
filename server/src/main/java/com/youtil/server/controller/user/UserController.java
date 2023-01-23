package com.youtil.server.controller.user;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.domain.user.User;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.repository.user.UserRepository;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return (User) userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
//    public  ResponseEntity<CommonResponse>  getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
//
//        return ResponseEntity.ok().body(CommonResponse.of(
//                HttpStatus.OK, "유저 정보 조회 성공", userService.getUser(userPrincipal.getId())));
//
//    }


}