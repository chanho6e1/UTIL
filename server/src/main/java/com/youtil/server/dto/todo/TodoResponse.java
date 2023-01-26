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
    private boolean isDone;
    private String dueDate;
    private String description;

    public TodoResponse(Todo todo) {
        todoId = todo.getTodoId();
        title = todo.getTitle();
        isDone = todo.getIsDone();
        dueDate = todo.getDueDate();
        description = todo.getDescription();
    }
}
