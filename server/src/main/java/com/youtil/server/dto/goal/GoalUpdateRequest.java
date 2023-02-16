package com.youtil.server.dto.goal;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class GoalUpdateRequest {
    @NotBlank(message = "목표 내용이 없습니다.")
    private String title;
    private String startDate;
    private String endDate;
    private String imageUrl;

    public Goal of(User user) {
        return Goal.builder().user(user).title(title).startDate(startDate).endDate(endDate).build();
    }
}