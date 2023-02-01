package com.youtil.server.dto.todo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PeriodResponse {
    private String minDate;
    private String maxDate;

    public PeriodResponse(String minDate, String maxDate){
        this.minDate = minDate;
        this.maxDate = maxDate;
    }
}
