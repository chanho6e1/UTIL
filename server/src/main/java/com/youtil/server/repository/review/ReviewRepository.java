package com.youtil.server.repository.review;

import com.youtil.server.domain.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findReviewByReviewId(Long reviewId);
}
