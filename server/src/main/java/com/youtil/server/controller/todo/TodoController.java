package com.youtil.server.controller.todo;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.dto.todo.TodoSaveRequest;
import com.youtil.server.dto.todo.TodoStateRequest;
import com.youtil.server.dto.todo.TodoUpdateDateRequest;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.todo.TodoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@Api(tags = {"투두 컨트롤러"})
public class TodoController {
    @Autowired
    TodoService todoService;

    @ApiOperation(value = "투두 등록", notes = "투두를 등록한다")
    @PostMapping("/{goalId}")
    public ResponseEntity<CommonResponse> createTodo(@PathVariable Long goalId, @RequestBody @Valid TodoSaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", todoService.createTodo(goalId, request)));
    }

    @ApiOperation(value = "투두 수정", notes = "해당 투두를 수정한다")
    @PutMapping("/{todoId}")
    public ResponseEntity<CommonResponse> updateTodo(@PathVariable Long todoId,
                                                     @RequestBody @Valid TodoSaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "투두 수정 성공", todoService.updateTodo(todoId, request)));
    }

    @ApiOperation(value = "투두 상태 수정", notes = "해당 투두 상태를 수정한다")
    @PutMapping("/{todoId}/state")
    public ResponseEntity<CommonResponse> setTodoState(@PathVariable Long todoId) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "투두 상태 수정 성공", todoService.setTodoState(todoId)));
    }
    @ApiOperation(value = "전체 투두 날짜 수정", notes = "전체 투두 날짜를 수정한다")
    @PutMapping("/dates/{goalId}")
    public ResponseEntity<CommonResponse> updateTodoDate(@PathVariable Long goalId, @RequestBody @Valid List<TodoUpdateDateRequest> request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "전체 투두 날짜 수정 성공", todoService.updateTodoDate(goalId, request)));
    }

    @ApiOperation(value = "투두 삭제", notes = "투두를 삭제한다")
    @DeleteMapping("/{todoId}")
    public ResponseEntity<CommonResponse> deleteTodo(@PathVariable Long todoId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "카테고리 삭제 성공", todoService.deleteTodo(todoId)));
    }

    @ApiOperation(value = "목표별 투두 조회", notes = "목표별 투두를 조회한다")
    @GetMapping("/goals/{goalId}")
    public ResponseEntity<CommonResponse> getTodoByGoal(@PathVariable Long goalId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "목표별 투두 조회 성공", todoService.getTodoByGoal(goalId)));

    }

    @ApiOperation(value = "목표별 투두 전체 미완료 여부", notes = "목표id를 보냈을 때 목표별 투두가 전체 미완료라면 true를 리턴")
    @GetMapping("/goals/{goalId}/true")
    public ResponseEntity<CommonResponse> getTodoStateAllTrueByGoal(@PathVariable Long goalId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "목표별 투두 전체 미완료 여부 조회 성공", todoService.getTodoState(goalId)));
    }
    @ApiOperation(value = "날짜별 투두 조회", notes = "날짜별 투두를 조회한다")
    @GetMapping("/today/{dueDate}")
    public ResponseEntity<CommonResponse> getTodoByGoal(@PathVariable String dueDate){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "날짜별 투두 조회 성공", todoService.getTodoByDate(dueDate)));
    }

    @ApiOperation(value = "전체 목표별 투두 최소, 최고 날짜 조회", notes = "사용자의 전체 목표에서 최소, 최고 날짜를 조회한다.")
    @GetMapping("/period")
    public ResponseEntity<CommonResponse> getTodoPeriod(@CurrentUser UserPrincipal userPrincipal){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "목표별 투두 min, max 조회 성공", todoService.getTodoPeriod(userPrincipal.getId())));
    }

    @ApiOperation(value = "단일 목표별 투두 최소, 최고 날짜 조회", notes = "목표 아이디를 보내면 사용자의 단일 목표에서 투두에서 최소, 최고 날짜를 조회한다.")
    @GetMapping("/period/{goalId}")
    public ResponseEntity<CommonResponse> getTodoPeriod(@PathVariable Long goalId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "단일 목표별 투두 min, max 조회 성공", todoService.getTodoPeriodByGoal(goalId)));
    }

    @ApiOperation(value = "목표별로 모든 투두가 완료 여부 확인", notes = "목표 아이디를 보내면 목표별로 모든 투두가 완료 되었는지 확인한다.")
    @GetMapping("/goals/{goalId}/state")
    public ResponseEntity<CommonResponse> getTodoStateForGoal(@PathVariable Long goalId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "목표별 모든 투두 완료 조회 성공", todoService.getTodoStateForGoal(goalId)));
    }
}
