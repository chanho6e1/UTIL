package com.youtil.server.controller.goal;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.dto.goal.GoalSaveRequest;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.goal.GoalService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/goals")
@Api(tags = {"goal 컨트롤러"})
public class GoalController {

    @Autowired
    GoalService goalService;

    @PostMapping
    public ResponseEntity<CommonResponse> createGoal(@CurrentUser UserPrincipal userPrincipal, @RequestBody @Valid GoalSaveRequest request){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", goalService.createGoal(userPrincipal.getId(), request)));
    }
}
