package com.youtil.server.controller.todo;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostSaveRequest;
import com.youtil.server.dto.todo.TodoSaveRequest;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.todo.TodoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

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
}
