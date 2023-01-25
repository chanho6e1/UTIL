package com.youtil.server.service.todo;

import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.tag.Tag;
import com.youtil.server.domain.todo.Todo;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.category.CategorySaveRequest;
import com.youtil.server.dto.tag.TagResponse;
import com.youtil.server.dto.tag.TagSaveRequest;
import com.youtil.server.dto.tag.TagUpdateRequest;
import com.youtil.server.dto.todo.TodoSaveRequest;
import com.youtil.server.repository.tag.TagRepository;
import com.youtil.server.repository.todo.TodoRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoService {
    @Autowired
    private final TodoRepository todoRepository;
    @Autowired
    private final UserRepository userRepository;

//    @Autowired
//    private final GoalRepository goalRepository;

    @Transactional
    public Long createTodo(Long goalId, TodoSaveRequest request) {
        Todo todo;

//        Goal goal = goalRepository.findById(goalId).orElseThrow(() -> new ResourceNotFoundException("goal", "goalId", goalId));
        todo = todoRepository.save(request.of(goalId));

        return todo.getTodoId();
    }

    @Transactional
    public Long updateTodo(Long todoId, TodoSaveRequest request) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("todo", "todoId", todoId));
        todo.update(request);

        return todo.getTodoId();
    }

}
