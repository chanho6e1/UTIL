package com.youtil.server.dto.goal;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class GoalResponse {

    private Long goalId;
    private String title;
    private String startDate;
    private String endDate;

    public GoalResponse(Goal goal){
        this.goalId = goal.getGoalId();
        this.title = goal.getTitle();
        this.startDate = goal.getStartDate();
        this.endDate = goal.getEndDate();
    }


}
