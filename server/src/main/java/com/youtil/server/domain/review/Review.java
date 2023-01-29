package com.youtil.server.domain.review;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.dto.review.ReviewUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goal_id")
    private Goal goal;

    private String title;
    private String content;

    private Long isPrivate; //공개2, 팔로워1, 비공개0


    @Builder
    public Review(Goal goal, String title, String content, Long isPrivate){
        this.goal = goal;
        this.title = title;
        this.content = content;
        this.isPrivate = isPrivate;
    }

    public Review update(ReviewUpdateRequest review){
        this.title = review.getTitle();
        this.content = review.getContent();
        this.isPrivate = review.getIsPrivate();

        return this;
    }
}
