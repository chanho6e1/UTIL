package com.youtil.server.dto.todo;

public class TodoPeriodResponse {
    private String minDate;
    private String maxDate;

    public TodoPeriodResponse(String minDate, String maxDate){
        this.minDate = minDate;
        this.maxDate = maxDate;
    }
}
