package com.youtil.server.service.review;

import com.youtil.server.domain.review.Review;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.review.ReviewSaveRequest;
import com.youtil.server.repository.review.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;
    public Object createReview(Long userId, ReviewSaveRequest request) {
//        User user =
//        Review reivew = reviewRepository.save(request.of(user));
        return null;
    }
}
