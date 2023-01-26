package com.youtil.server.controller.todo;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.dto.todo.TodoSaveRequest;
import com.youtil.server.service.todo.TodoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/todos")
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
                HttpStatus.CREATED, "카테고리 수정 성공", todoService.updateTodo(todoId, request)));
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
                HttpStatus.CREATED, "목표별 투두 조회 성공", todoService.getTodoByGoal(goalId)));


    }
    @ApiOperation(value = "날짜별 투두 조회", notes = "날짜별 투두를 조회한다")
    @GetMapping("/today/{dueDate}")
    public ResponseEntity<CommonResponse> getTodoByGoal(@PathVariable String dueDate){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "날짜별 투두 조회 성공", todoService.getTodoByDate(dueDate)));
    }
}
