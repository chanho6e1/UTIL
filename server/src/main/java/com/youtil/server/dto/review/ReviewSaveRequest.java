package com.youtil.server.dto.review;

import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.review.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewSaveRequest {
    @NotBlank(message = "회고록 제목이 없습니다.")
    private String title;
    @NotBlank(message = "회고록 내용이 없습니다.")
    private String content;
    private Long isPrivate; //공개2, 팔로워1, 비공개0

    public Review of(Goal goal){
        return Review.builder().goal(goal).title(title).content(content).isPrivate(isPrivate).build();
    }
}
