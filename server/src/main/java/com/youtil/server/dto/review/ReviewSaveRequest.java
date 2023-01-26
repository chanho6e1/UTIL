package com.youtil.server.dto.review;

import com.youtil.server.domain.goal.Goal;

public class ReviewSaveRequest {
    private Long goalId;
    private String content;
    private Long isPrivate;
}
