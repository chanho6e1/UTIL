package com.youtil.server.controller.goal;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.dto.goal.GoalSaveRequest;
import com.youtil.server.dto.goal.GoalUpdateRequest;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.goal.GoalService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/goals")
@Api(tags = {"goal 컨트롤러"})
public class GoalController {

    @Autowired
    GoalService goalService;

    @ApiOperation(value = "목표 등록", notes = "목표를 등록한다.")
    @PostMapping
    public ResponseEntity<CommonResponse> createGoal(@CurrentUser UserPrincipal userPrincipal, @RequestBody @Valid GoalSaveRequest request){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", goalService.createGoal(userPrincipal.getId(), request)));
    }

    @ApiOperation(value = "나의 목표 리스트", notes = "내가 작성한 목표를 조회한다.")
    @GetMapping
    public ResponseEntity<CommonResponse> getGoalList(@CurrentUser UserPrincipal userPrincipal){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", goalService.getGoalList(userPrincipal.getId())));
    }

    @ApiOperation(value = "목표 단일 조회", notes = "내가 작성한 목표를 단일 조회한다.")
    @GetMapping("/{goalId}")
    public ResponseEntity<CommonResponse> getGoal(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long goalId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", goalService.getGoal(userPrincipal.getId(), goalId)));
    }

    @ApiOperation(value = "목표 수정", notes = "내가 작성한 목표를 수정한다.")
    @PutMapping("/{goalId}")
    public ResponseEntity<CommonResponse> updateGoal(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long goalId, @RequestBody @Valid GoalUpdateRequest request){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", goalService.updateGoal(userPrincipal.getId(), goalId, request)));
    }

    @ApiOperation(value = "목표 삭제", notes = "내가 작성한 목표를 삭제한다.")
    @DeleteMapping("/{goalId}")
    public ResponseEntity<CommonResponse> deleteGoal(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long goalId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "삭제 성공", goalService.deleteGoal(userPrincipal.getId(), goalId)));
    }
    
    //목표별 글보기
    @ApiOperation(value = "목표별 글 조회", notes = "목표에 해당하는 글 목록을 조회한다.")
    @GetMapping("/{goalId}/posts")
    public ResponseEntity<CommonResponse> getGoalPost(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long goalId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", null
        ));
    }
}
