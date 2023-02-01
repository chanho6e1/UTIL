package com.youtil.server.service.todo;

import com.youtil.server.common.exception.ArgumentMismatchException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.todo.Todo;
import com.youtil.server.dto.goal.GoalPeriodResponse;
import com.youtil.server.dto.todo.*;
import com.youtil.server.repository.goal.GoalRepository;
import com.youtil.server.repository.todo.TodoRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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

        String[] arr = request.getDueDate().split("T");
        request.setDueDate(arr[0]);

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

        String[] arr = request.getDueDate().split("T");
        request.setDueDate(arr[0]);

        todoRepository.checkTodoPeriod(todo.getGoal(), request.getDueDate()).orElseThrow(() -> new ArgumentMismatchException("todo 날짜가 목표 범위 벗어남", todoId));
        todo.update(request);


        return todo.getTodoId();
    }

    @Transactional
    public Long updateTodoDate(List<TodoUpdateDateRequest> request) { // 전체 투두 날짜 변경
        Todo todo = new Todo();
        for(TodoUpdateDateRequest re : request){
            todo = todoRepository.findById(re.getTodoId()).orElseThrow(() -> new ResourceNotFoundException("todo", "todoId", re.getTodoId()));
            todo.updateDate(re.getDueDate());
        }
        return todo.getGoal().getGoalId();
    }

    @Transactional
    public Long setTodoState(Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("todo", "todoId", todoId));
        boolean state = !todo.isState();
        todo.update(state);
        return todo.getTodoId();
    }

    @Transactional
    public Long deleteTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("todo", "todoId", todoId));
        todoRepository.deleteByTodoId(todoId);
        return todoId;
    }

    public List<TodoPeriodResponse> getTodoPeriod(Long userId) {

        List<Map<String, Object>> mapList = todoRepository.findTodoPeriod(userId);
        List<TodoPeriodResponse> result = new ArrayList<>();

        for(Map<String, Object> map : mapList){
            String goalId = map.get("goalId").toString();
            String minDate = map.get("minDate").toString();
            String maxDate = map.get("maxDate").toString();
            result.add(new TodoPeriodResponse(goalId, minDate, maxDate));
        }

//        Map<String, String> map = todoRepository.findTodoPeriod(userId);
//        String minDate = map.get("minDate");
//        String maxDate = map.get("maxDate");

        return result;
    }
}
