package com.youtil.server.service.review;

import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.review.Review;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.review.ReviewResponse;
import com.youtil.server.dto.review.ReviewSaveRequest;
import com.youtil.server.repository.goal.GoalRepository;
import com.youtil.server.repository.review.ReviewQueryRepository;
import com.youtil.server.repository.review.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;
    @Autowired
    private final ReviewQueryRepository reviewQueryRepository;
    @Autowired
    private final GoalRepository goalRepository;

    @Transactional
    public Long createReview(Long goalId, ReviewSaveRequest request) {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));
        Review review = reviewRepository.save(request.of(goal));
        return review.getReviewId();
    }

    public List<ReviewResponse> getReviewList(Long goalId) {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));

        System.out.println(reviewQueryRepository.findReviewListByGoal(goalId).stream().map((review) -> new ReviewResponse(review)).collect(Collectors.toList()));

//        return goalQueryRepository.findGoalListByUser(userId).stream().map((goal) -> new GoalResponse(goal)).collect(Collectors.toList());

        return reviewQueryRepository.findReviewListByGoal(goalId).stream().map((review) -> new ReviewResponse(review)).collect(Collectors.toList());
    }

    public ReviewResponse getReview(Long reviewId){
        Review review =reviewRepository.findReviewByReviewId(reviewId).orElseThrow(() -> new ResourceNotFoundException("Review", "reviewId", reviewId));

        return new ReviewResponse(review);
    }
}
