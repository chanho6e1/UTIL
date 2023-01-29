package com.youtil.server.controller.review;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.dto.review.ReviewSaveRequest;
import com.youtil.server.dto.review.ReviewUpdateRequest;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.review.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/reviews")
@Api(tags = {"리뷰 컨트롤러"})
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @ApiOperation(value = "회고록 등록", notes = "회고록을 등록한다.")
    @PostMapping("/{goalId}")
    public ResponseEntity<CommonResponse> createReview(@PathVariable Long goalId, @RequestBody @Valid ReviewSaveRequest request){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", reviewService.createReview(goalId, request)));
    }

    @ApiOperation(value = "회고록 리스트 조회", notes = "목표에 해당하는 회고록 리스트를 반환한다.")
    @GetMapping("/{goalId}/goals")
    public ResponseEntity<CommonResponse> getReviewList(@PathVariable Long goalId){
        return ResponseEntity.ok().body(CommonResponse.of(
           HttpStatus.OK, "조회 성공", reviewService.getReviewList(goalId)));
    }

    @ApiOperation(value = "회고록 상세 조회", notes = "회고록 상세 정보를 반환한다.")
    @GetMapping("/{reviewId}")
    public ResponseEntity<CommonResponse> getReview(@PathVariable Long reviewId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "조회 성공", reviewService.getReview(reviewId)));
    }

    @ApiOperation(value = "회고록 수정", notes = "회고록을 수정한다.")
    @PutMapping("/{reviewId}")
    public ResponseEntity<CommonResponse> updateReview(@PathVariable Long reviewId, @RequestBody @Valid ReviewUpdateRequest request){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", reviewService.updateReview(reviewId, request)));
    }

    @ApiOperation(value = "회고록 삭제", notes = "회고록을 삭제한다.")
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<CommonResponse> deleteReview(@PathVariable Long reviewId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "삭제 성공", reviewService.deleteReview(reviewId)));
    }
}
