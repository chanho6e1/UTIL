package com.youtil.server.dto.todo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class TodoPeriodResponse {

    private String goalId;
    private String minDate;
    private String maxDate;

    public TodoPeriodResponse(String goalId, String minDate, String maxDate){
        this.goalId = goalId;
        this.minDate = minDate;
        this.maxDate = maxDate;
    }
}