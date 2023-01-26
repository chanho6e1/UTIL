package com.youtil.server.dto.todo;

import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.todo.Todo;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class TodoSaveRequest {
    private String title;
    private String description;
    private boolean isDone;
    private String dueDate;

    public Todo of(Goal goal) {
        return Todo.builder().goal(goal).title(title).description(description).isDone(isDone).dueDate(dueDate).build();
    }
}
