package com.youtil.server.server.domain.user.auth;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.oauth.config.LoginUser;
import com.youtil.server.oauth.entity.SessionUser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

//    private final AuthService authService;

//    @PostMapping("/login/{socialType}")
//    public ResponseEntity<CommonResponseDto> login(@PathVariable String socialType, @RequestParam("code") String code) {
//        return ResponseEntity.ok().body(CommonResponseDto.of(
//                HttpStatus.CREATED, SUCCESS_POST_LOGIN, authService.login(socialType, code)));
//    }
}
