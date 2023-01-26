package com.youtil.server.service.todo;

import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.todo.Todo;
import com.youtil.server.dto.todo.TodoResponse;
import com.youtil.server.dto.todo.TodoSaveRequest;
import com.youtil.server.repository.goal.GoalRepository;
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
    @Autowired
    private final GoalRepository goalRepository;

    @Transactional
    public Long createTodo(Long goalId, TodoSaveRequest request) {
        Todo todo;

        Goal goal = goalRepository.findById(goalId).orElseThrow(() -> new ResourceNotFoundException("goal", "goalId", goalId));
        todo = todoRepository.save(request.of(goal));

        return todo.getTodoId();
    }

    public List<TodoResponse> getTodoByGoal(Long goalId) { // 목표별 투두 리스트 조회
        Goal goal = goalRepository.findById(goalId).orElseThrow(() -> new ResourceNotFoundException("goal", "goalId", goalId));
        return todoRepository.findByGoalId(goal)
                .stream().map(TodoResponse::new).collect(Collectors.toList());
    }

    public List<TodoResponse> getTodoByDate(String dueDate) { // 날짜별 투두 리스트 조회
        return todoRepository.findByDate(dueDate)
                .stream().map(TodoResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public Long updateTodo(Long todoId, TodoSaveRequest request) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("todo", "todoId", todoId));
        todo.update(request);
        return todo.getTodoId();
    }

    @Transactional
    public Long deleteTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("todo", "todoId", todoId));
        todoRepository.deleteByTodoId(todoId);
        return todoId;
    }

}
