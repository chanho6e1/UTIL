package com.youtil.server.dto.todo;

import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.todo.Todo;
import com.youtil.server.domain.user.User;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TodoSaveRequest {
    private String title;
    private String description;
    private boolean state;
    private String dueDate;

    public Todo of(Goal goal) {
        return Todo.builder().goal(goal).title(title).description(description).state(state).dueDate(dueDate).build();
    }
}
