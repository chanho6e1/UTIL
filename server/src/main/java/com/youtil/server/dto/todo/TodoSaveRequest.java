package com.youtil.server.dto.todo;

import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.todo.Todo;
import com.youtil.server.domain.user.User;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TodoSaveRequest {
    @NotBlank(message = "제목이 없습니다.")
    @Length(max = 25, message = "25자 이하여야 합니다.")
    private String title;
    private String description;
    private boolean state;
    private String dueDate;

    public Todo of(Goal goal) {
        return Todo.builder().goal(goal).title(title).description(description).state(state).dueDate(dueDate).build();
    }
}
