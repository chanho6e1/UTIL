package com.youtil.server.dto.todo;

import com.youtil.server.domain.todo.Todo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class TodoResponse {
    private Long todoId;
    private String title;
    private boolean state;
    private String dueDate;
    private String description;
    private Long goalId;

    public TodoResponse(Todo todo) {
        todoId = todo.getTodoId();
        title = todo.getTitle();
        state = todo.isState();
        dueDate = todo.getDueDate();
        description = todo.getDescription();
        goalId = todo.getGoal().getGoalId();
    }
}
