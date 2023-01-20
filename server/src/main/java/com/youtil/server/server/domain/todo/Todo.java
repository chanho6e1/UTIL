package com.youtil.server.server.domain.todo;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.tag.Tag;

import javax.persistence.*;

@Entity
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


}
