package com.youtil.server.repository.review;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.review.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youtil.server.domain.review.QReview.review;


@RequiredArgsConstructor
@Repository
public class ReviewQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<Review> findReviewListByGoal(Long goalId){
        return jpaQueryFactory.select(review)
                .distinct().from(review)
                .where(review.goal.goalId.eq(goalId))
                .orderBy(review.createdDate.asc())
                .fetch();
    }
}
