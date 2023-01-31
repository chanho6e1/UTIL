package com.youtil.server.dto.goal;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.codec.StringEncoder;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class GoalPeriodResponse {
    private String startDate;
    private String endDate;

    public GoalPeriodResponse(String startDate, String endDate){
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
