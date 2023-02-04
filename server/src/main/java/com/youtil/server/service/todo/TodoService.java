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

import java.util.*;
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

        todoRepository.checkTodoAndGoalPeriod(goalId, request.getDueDate()).orElseThrow(
                () -> new ArgumentMismatchException("todo 날짜가 목표 범위 벗어남",goal.getStartDate() + "~" + goal.getEndDate()));


        todo = todoRepository.save(request.of(goal)) ;

        return todo.getTodoId();
    }

    public List<TodoResponse> getTodoByGoal(Long goalId) { // 목표별 투두 리스트 조회
        Goal goal = goalRepository.findById(goalId).orElseThrow(() -> new ResourceNotFoundException("goal", "goalId", goalId));
        return todoRepository.findByGoalId(goal)
                .stream().map(TodoResponse::new).collect(Collectors.toList());
    }

    public List<TodoResponse> getTodoByDate(Long userId, String dueDate) { // 날짜별 투두 리스트 조회
        return todoRepository.findByDate(userId, dueDate)
                .stream().map(TodoResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public Long updateTodo(Long todoId, TodoSaveRequest request) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("todo", "todoId", todoId));

        String[] arr = request.getDueDate().split("T");
        request.setDueDate(arr[0]);

        Todo temp = todoRepository.checkTodoPeriod(todo.getGoal(), request.getDueDate(), todoId).orElseThrow(() -> new ArgumentMismatchException("todo 날짜가 목표 범위 벗어남", todo.getGoal().getStartDate() + "~" + todo.getGoal().getEndDate()));
        todo.update(request);
        return todo.getTodoId();
    }

    @Transactional
    public Long updateTodoDate(Long goalId, List<TodoUpdateDateRequest> request) {   // 투두 날짜 전체 이동
        Goal goal = goalRepository.findById(goalId).orElseThrow(() -> new ResourceNotFoundException("goal", "goalId", goalId));
        Optional<List<Object>> list = todoRepository.checkTodoStateAllTrueByGoal(goal); // 참이라면 추가됨

        if(!list.get().isEmpty()){ // 참이 하나라도 있다면
            System.out.println("여기 들어옴");
            throw new ArgumentMismatchException("목표 내 todo의 state가 1개 이상 체크되어 있음", goalId);
        }
        for(TodoUpdateDateRequest re : request){
            System.out.println("todo id" + re.getTodoId());
            Todo todo = todoRepository.findById(re.getTodoId()).orElseThrow(() -> new ResourceNotFoundException("todo", "todoId", re.getTodoId()));
            todo.updateDate(re.getDueDate());
        }
        return goalId;
    }

    public boolean getTodoState(Long goalId) { // 목표에 대한 투두가 모두 미완료(false)인가?
        Goal goal = goalRepository.findById(goalId).orElseThrow(() -> new ResourceNotFoundException("goal", "goalId", goalId));
        Optional<List<Object>> list = todoRepository.checkTodoStateAllTrueByGoal(goal); // 하나라도 참이라면 추가됨
        if(!list.get().isEmpty()){ // 참이 하나라도 있다면
            return false;
        }
        return true;
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

    public List<Map<String, TodoPeriodResponse>> getTodoPeriod(Long userId) {

        List<Map<String, Object>> mapList = todoRepository.findTodoPeriod(userId);

        List<Map<String, TodoPeriodResponse>> result = new ArrayList<>();
        Map<String, TodoPeriodResponse> maps = new HashMap<>();

        for(Map<String, Object> map : mapList){
            String goalId = map.get("goalId").toString();
            String minDate = map.get("minDate").toString();
            String maxDate = map.get("maxDate").toString();

            TodoPeriodResponse todoPeriodResponse = new TodoPeriodResponse(minDate, maxDate);
            maps.put(goalId, todoPeriodResponse);
        }
        result.add(maps);

        return result;
    }

    public Map<String, TodoPeriodResponse> getTodoPeriodByGoal(Long goalid) {
        Goal goal = goalRepository.findById(goalid).orElseThrow(() -> new ResourceNotFoundException("goal", "goalId", goalid));
        Map<String, Object> mapList = todoRepository.findTodoPeriodByGoal(goal);

        Map<String, TodoPeriodResponse> map = new HashMap<>();

        String goalId = mapList.get("goalId").toString();
        String minDate = mapList.get("minDate").toString();
        String maxDate = mapList.get("maxDate").toString();

        TodoPeriodResponse todoPeriodResponse = new TodoPeriodResponse(minDate, maxDate);

        map.put(goalId, todoPeriodResponse);

        return map;
    }

    // 목표별로 모든 투두가 완료인지 아닌지에 대해
    public boolean getTodoStateForGoal(Long goalId) { // 목표별 투두 리스트 조회
        Goal goal = goalRepository.findById(goalId).orElseThrow(() -> new ResourceNotFoundException("goal", "goalId", goalId));
        if(todoRepository.getTodoStateForGoal(goal).get().isEmpty()){
            return true;
        };
        return false;
    }
}
