package com.youtil.server.repository.review;

import com.youtil.server.domain.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findReviewByReviewId(Long reviewId);

    @Transactional
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("delete from Review r where r.goal.goalId = :goalId")
    void deleteByGoalId(Long goalId);

    @Query("select r from Review r join Goal g on r.goal.goalId= g.goalId where r.reviewId = :reviewId and g.user.userId = :userId")
    Optional<Review> isMine(@Param("reviewId")Long reviewId, @Param("userId")Long userId);
}
