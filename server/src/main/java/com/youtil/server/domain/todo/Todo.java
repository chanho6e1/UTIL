package com.youtil.server.domain.todo;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
public class Todo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id")
    private Long todoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goal_id")
    private Goal goal;

    private String dueDate;

    private Boolean isDone;

    private String title;

    private String description;
    @Builder
    public Todo(Goal goal, String dueDate, Boolean isDone, String title, String description){
        this.goal = goal;
        this.dueDate = dueDate;
        this.isDone = isDone;
        this.title = title;
        this.description = description;
    }

}
