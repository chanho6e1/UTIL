package com.youtil.server.controller.user;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.user.FollowService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follows")
@Api(tags = {"팔로우 컨트롤러"})
public class FollowController {
    @Autowired
    FollowService followService;
    @ApiOperation(value = "팔로우", notes = "팔로우 한다")
    @PostMapping("/{toUserId}")
    public ResponseEntity<CommonResponse> follow(@CurrentUser UserPrincipal user, @PathVariable("toUserId") Long toUserId) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "팔로우 성공", followService.follow(user.getId(), toUserId)));
    }
    @ApiOperation(value = "언팔로우", notes = "언팔로우 한다")
    @DeleteMapping("/{toUserId}")
    public ResponseEntity<CommonResponse> unfollow(@CurrentUser UserPrincipal user, @PathVariable("toUserId") Long toUserId) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "언팔로우 성공", followService.deleteByFollowingIdAndFollowerId(user.getId(), toUserId)));
    }

    @ApiOperation(value = "단일 팔로우 확인", notes = "단일 팔로우 여부 확인한다")
    @GetMapping("/{toUserId}")
    public ResponseEntity<CommonResponse> find(@CurrentUser UserPrincipal user, @PathVariable("toUserId") Long toUserId){
//        System.out.printf("toUserId : " + toUserId + " fromUserId : " + user.getId() );

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "단일 팔로우 여부 조회 성공", followService.find(user.getId(), toUserId)));
    }

    @ApiOperation(value = "자신 전체 팔로우 확인", notes = "자신 전체 팔로우 여부 확인한다")
    @GetMapping("/following")
    public ResponseEntity<CommonResponse> getFollowing(@CurrentUser UserPrincipal user){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "자신 전체 팔로우 여부 조회 성공", followService.getFollowing(user.getId())));
    }

    @ApiOperation(value = "전체 팔로워 확인", notes = "전체 팔로워 여부 확인한다")
    @GetMapping("/follower")
    public ResponseEntity<CommonResponse> getFollower(@CurrentUser UserPrincipal user){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "자신 전체 팔로워 여부 조회 성공", followService.getFollower(user.getId())));
    }

    @ApiOperation(value = "타인 전체 팔로우 확인", notes = "자신 전체 팔로우 여부 확인한다")
    @GetMapping("/following/{userId}")
    public ResponseEntity<CommonResponse> getOtherFollowing(@PathVariable("userId") Long userId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "타인 전체 팔로우 여부 조회 성공", followService.getFollowing(userId)));
    }

    @ApiOperation(value = "타인 전체 팔로워 확인", notes = "타인 전체 팔로워 여부 확인한다")
    @GetMapping("/follower/{userId}")
    public ResponseEntity<CommonResponse> getOtherFollower(@PathVariable("userId") Long userId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "타인 전체 팔로워 여부 조회 성공", followService.getFollower(userId)));
    }
}
