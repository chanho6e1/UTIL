package com.youtil.server.controller.post;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.post.AlarmService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/alarms")
public class PostAlarmController {
    @Autowired
    AlarmService alarmService;
    @ApiOperation(value = "나의 포스트에 달린 댓글 알람", notes = "나의 포스트에 달린 답댓글 최근 5개를 조회한다")
    @GetMapping("/comment")
    public ResponseEntity<CommonResponse> getComment(@CurrentUser UserPrincipal userPrincipal){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", alarmService.getCommentForMe(userPrincipal.getId())));
    }

}
