package com.youtil.server.dto.review;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.review.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ReviewResponse {
    private Long reviewId;
    private String title;
    private String content;
    private Long isPrivate;
    private String createdDate;
    private String modifiedDate;

    public ReviewResponse(Review review){

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

        this.reviewId = review.getReviewId();
        this.title = review.getTitle();
        this.content = review.getContent();
        this.isPrivate = review.getIsPrivate();
        this.createdDate = review.getCreatedDate().format(myFormatObj);
        if(review.getModifiedDate()!=null){
            this.modifiedDate = review.getModifiedDate().format(myFormatObj);
        }
    }

}
