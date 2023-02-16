package com.youtil.server.dto.review;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.youtil.server.domain.review.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ReviewGoalResponse {
    private Long reviewId;
    private Long goalId;

    public ReviewGoalResponse(Review review){
        this.reviewId = review.getReviewId();
        this.goalId = review.getGoal().getGoalId();

    }

}
