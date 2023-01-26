package com.youtil.server.dto.goal;

import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GoalUpdateRequest {
    @NotBlank(message = "목표 내용이 없습니다.")
    private String title;
    private String startDate;
    private String endDate;

    public Goal of(User user) {
        return Goal.builder().user(user).title(title).startDate(startDate).endDate(endDate).build();
    }
}