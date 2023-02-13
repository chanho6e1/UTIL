package com.youtil.server.controller.user;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.dto.user.UserUpdateRequest;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/user")
@Api(tags = {"유저 컨트롤러"})
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/me")
    @ApiOperation(value = "로그인 유저 조회", notes = "현재 로그인한 유저 정보를 반환한다.")
    @PreAuthorize("hasRole('USER')")
    public  ResponseEntity<CommonResponse>  getCurrentUser(@ApiIgnore @CurrentUser UserPrincipal userPrincipal) {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유저 정보 조회 성공", userService.getCurrentUser(userPrincipal.getId())));
    }

    @PutMapping
    @ApiOperation(value = "유저 정보 업데이트", notes = "현재 로그인한 유저 정보를 업데이트한다.")
    public ResponseEntity<CommonResponse> updateUserInfo(@ApiIgnore @CurrentUser UserPrincipal userPrincipal,
                                                         @RequestBody @Valid UserUpdateRequest request) throws UnsupportedEncodingException {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "유저 정보 수정 성공", userService.updateUser(userPrincipal.getId(), request)));
    }

    @GetMapping("/nickname/{nickName}")
    @ApiOperation(value = "닉네임 중복 검사", notes ="닉네임 중복 여부를 체크한다.")
    public ResponseEntity<CommonResponse> checkNickName(@PathVariable String nickName){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "닉네임 중복 조회 성공", userService.checkNickName(nickName)));
    }

    @GetMapping("/email/{email}")
    @ApiOperation(value = "이메일 중복 검사", notes ="이메일 중복 여부로 가입 여부를 체크한다.")
    public ResponseEntity<CommonResponse> checkEmail(@PathVariable String email){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "이메일 중복 조회 성공", userService.checkEmail(email)));
    }

    @GetMapping("/{userId}")
    @ApiOperation(value = "유저 정보 조회", notes = "조회하고자 하는 유저의 정보를 반환한다.")
    public ResponseEntity<CommonResponse> getUser(@PathVariable Long userId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유저 조회 성공", userService.getUser(userId)));
    }

    @GetMapping("/search/{nickName}")
    @ApiOperation(value = "유저 정보 조회", notes = "조회하고자 하는 유저의 정보를 반환한다.")
    public ResponseEntity<CommonResponse> getUserByNickName(@PathVariable String nickName){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유저 조회 성공", userService.getUserByNickName(nickName)));
    }

}