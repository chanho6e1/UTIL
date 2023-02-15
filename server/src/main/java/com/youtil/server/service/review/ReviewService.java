package com.youtil.server.service.review;

import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.review.Review;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.review.ReviewGoalResponse;
import com.youtil.server.dto.review.ReviewResponse;
import com.youtil.server.dto.review.ReviewSaveRequest;
import com.youtil.server.dto.review.ReviewUpdateRequest;
import com.youtil.server.repository.goal.GoalRepository;
import com.youtil.server.repository.review.ReviewQueryRepository;
import com.youtil.server.repository.review.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final ReviewQueryRepository reviewQueryRepository;

    private final GoalRepository goalRepository;

    @Transactional
    public Long createReview(Long goalId, ReviewSaveRequest request) {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));
        Review review = reviewRepository.save(request.of(goal));
        return review.getReviewId();
    }

    public List<ReviewResponse> getReviewList기존(Long goalId, String criteria, int offset, int size, Long userId) {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));

//        System.out.println(reviewQueryRepository.findReviewListByGoal(goalId, PageRequest.of(offset, size)).stream().map((review) -> new ReviewResponse(review)).collect(Collectors.toList()));

//        return goalQueryRepository.findGoalListByUser(userId).stream().map((goal) -> new GoalResponse(goal)).collect(Collectors.toList());

        validGoalUser(userId, goal.getUser().getUserId()); //나의 목표가 아니다

        return reviewQueryRepository.findReviewListByGoal기존(goalId, PageRequest.of(offset-1, size)).stream().map((review) -> new ReviewResponse(review)).collect(Collectors.toList());
    }

    public Map<Long, ReviewResponse> getReviewList(Long goalId, String criteria, int offset, int size, Long userId) {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));

        validGoalUser(userId, goal.getUser().getUserId()); //나의 목표가 아니다

        Map<Long, ReviewResponse> responseMap = new LinkedHashMap<>();
        reviewQueryRepository.findReviewListByGoal(goalId, PageRequest.of(offset-1, size), criteria).stream()
                .map((review) -> responseMap.put(review.getReviewId(), new ReviewResponse(review))).collect(Collectors.toList());

        return responseMap;


    }

    public ReviewResponse getReview(Long reviewId, Long userId){
        Review review =reviewRepository.findReviewByReviewId(reviewId).orElseThrow(() -> new ResourceNotFoundException("Review", "reviewId", reviewId));
        Review myReview = reviewRepository.isMine(review.getReviewId(), userId).orElseThrow(() -> new ResourceNotFoundException("내가 만든 회고록이 아닙니다"));

        return new ReviewResponse(review);
    }

    @Transactional
    public ReviewGoalResponse updateReview(Long reviewId, ReviewUpdateRequest request, Long userId) {
        Review review = reviewRepository.findReviewByReviewId(reviewId).orElseThrow(() -> new ResourceNotFoundException("Review", "reviewId", reviewId));

        Review myReview = reviewRepository.isMine(review.getReviewId(), userId).orElseThrow(() -> new ResourceNotFoundException("내가 만든 회고록이 아닙니다"));

        review.update(request);

        return new ReviewGoalResponse(review);
    }

    @Transactional
    public Long deleteReview(Long reviewId, Long userId) {
        Review review = reviewRepository.findReviewByReviewId(reviewId).orElseThrow(() -> new ResourceNotFoundException("Review", "reviewId", reviewId));

        //내가 만든것만
        Review myReview = reviewRepository.isMine(review.getReviewId(), userId).orElseThrow(() -> new ResourceNotFoundException("내가 만든 회고록이 아닙니다"));

        reviewRepository.deleteById(reviewId);
        return reviewId;
    }


    public void validGoalUser(Long currentUser, Long goalUser) {

        if (currentUser == goalUser || currentUser.equals(goalUser)) {
            return;
        }
        else {
            throw new ResourceForbiddenException("본인이 작성한 회고록이 아닙니다");
        }
    }
}
