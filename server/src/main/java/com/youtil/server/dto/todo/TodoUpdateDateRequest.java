package com.youtil.server.dto.todo;

import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.todo.Todo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class TodoUpdateDateRequest {
    private Long todoId;
    private String dueDate;

}
