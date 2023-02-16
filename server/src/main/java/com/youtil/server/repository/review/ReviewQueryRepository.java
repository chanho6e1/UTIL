package com.youtil.server.repository.review;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.review.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youtil.server.domain.post.QPost.post;
import static com.youtil.server.domain.review.QReview.review;


@RequiredArgsConstructor
@Repository
public class ReviewQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;


    public List<Review> findReviewListByGoal기존(Long goalId, PageRequest pageRequest){
        return jpaQueryFactory.select(review)
                .distinct().from(review)
                .where(review.goal.goalId.eq(goalId))
                .orderBy(review.createdDate.asc())
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();
    }


    public List<Review> findReviewListByGoal(Long goalId, PageRequest pageRequest, String criteria){
        return jpaQueryFactory.select(review)
                .distinct().from(review)
                .where(review.goal.goalId.eq(goalId))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();
    }

    private OrderSpecifier<?> findCriteria(String criteria){ //정렬 조건
        if(criteria.contains("old")){
            return review.createdDate.asc();
        } else if(criteria.contains("new")){
            return review.createdDate.desc();
        }
        return review.createdDate.asc();
    }
}
