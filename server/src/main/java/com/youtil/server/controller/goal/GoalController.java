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
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;

@RestController
@RequestMapping("/api/goals")
@Api(tags = {"goal 컨트롤러"})
public class GoalController {

    @Autowired
    GoalService goalService;
    @ApiIgnore
    @ApiOperation(value = "목표 등록", notes = "목표를 등록한다.")
    @PostMapping
    public ResponseEntity<CommonResponse> createGoal(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @RequestBody @Valid GoalSaveRequest request){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", goalService.createGoal(userPrincipal.getId(), request)));
    }

    @ApiOperation(value = "나의 목표 리스트", notes = "내가 작성한 목표를 조회한다.")
    @GetMapping
    public ResponseEntity<CommonResponse> getGoalList(@ApiIgnore @CurrentUser UserPrincipal userPrincipal){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", goalService.getGoalList(userPrincipal.getId())));
    }

    @ApiOperation(value = "다른 유저의 목표 리스트", notes = "다른 유저가 작성한 목표를 조회한다.")
    @GetMapping("/{userId}/users")
    public ResponseEntity<CommonResponse> getGoalListByUserId(@PathVariable Long userId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", goalService.getGoalList(userId)));
    }

    @ApiOperation(value = "목표 단일 조회", notes = "내가 작성한 목표를 단일 조회한다.")
    @GetMapping("/{goalId}")
    public ResponseEntity<CommonResponse> getGoal(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @PathVariable Long goalId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", goalService.getGoal(userPrincipal.getId(), goalId)));
    }

    // input 2023-01-31T06:24:59.000Z
    @ApiIgnore
    @ApiOperation(value = "목표 수정", notes = "내가 작성한 목표를 수정한다.")
    @PutMapping("/{goalId}")
    public ResponseEntity<CommonResponse> updateGoal(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @PathVariable Long goalId, @RequestBody @Valid GoalUpdateRequest request) throws UnsupportedEncodingException {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", goalService.updateGoal(userPrincipal.getId(), goalId, request)));
    }
    @ApiIgnore
    @ApiOperation(value = "목표 삭제", notes = "내가 작성한 목표를 삭제한다.")
    @DeleteMapping("/{goalId}")
    public ResponseEntity<CommonResponse> deleteGoal(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @PathVariable Long goalId) throws UnsupportedEncodingException {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "삭제 성공", goalService.deleteGoal(userPrincipal.getId(), goalId)));
    }
    
    //목표별 글보기
    @ApiOperation(value = "목표별 글 조회", notes = "목표에 해당하는 글 목록을 조회한다.")
    @GetMapping("/{goalId}/posts-detail")
    public ResponseEntity<CommonResponse> getGoalPostDetail(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @PathVariable Long goalId,
                                                      @RequestParam(required=false, defaultValue = "1") int offset,
                                                      @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", goalService.getGoalPostDetail(userPrincipal.getId(), goalId, offset, size)
        ));
    }

    // 목표별 간단 글 정보 보기
    @ApiOperation(value = "목표별 간단 요약된 글 조회", notes = "목표에 해당하는 간단한 글 목록을 조회한다.")
    @GetMapping("/{goalId}/posts")
    public ResponseEntity<CommonResponse> getGoalPost(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @PathVariable Long goalId,
                                                      @RequestParam(required=false, defaultValue = "1") int offset,
                                                      @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", goalService.getGoalPost(userPrincipal.getId(), goalId, offset, size)
        ));
    }

    @ApiOperation(value = "목표 기간 정렬", notes = "내가 설정한 목표 총 기간(시작이 제일 빠른, 종료가 가장 느린 목표 날짜 각각 반환")
    @GetMapping("/period")
    public ResponseEntity<CommonResponse> getGoalPeriod(@ApiIgnore @CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", goalService.getGoalPeriod(userPrincipal.getId())
        ));
    }
    // 목표 제일 빠른 startDate, 제일 느린 endDate
    // input 2023-01-31T06:24:59.000Z

    @ApiIgnore
    @ApiOperation(value = "목표 달성 유무 변경", notes = "내가 설정한 목표의 달성 상태를 변경")
    @PutMapping("/{goalId}/state")
    public ResponseEntity<CommonResponse> updateGoalState(@ApiIgnore @CurrentUser UserPrincipal userPrincipal, @PathVariable Long goalId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", goalService.toggleGoalState(userPrincipal.getId(), goalId)
        ));
    }

    //진행중인 목표만 제공
    @ApiOperation(value = "나의 진행중인 목표만 제공", notes = "나의 진행중인 목표만 제공(정렬: 옛날꺼부터)")
    @GetMapping("/ing")
    public ResponseEntity<CommonResponse> getDoingGoal(@ApiIgnore @CurrentUser UserPrincipal userPrincipal){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "진행중인 목표 조회 성공", goalService.getDoingGoal(userPrincipal.getId())
        ));
    }

}
