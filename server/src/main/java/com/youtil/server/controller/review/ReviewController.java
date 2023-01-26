package com.youtil.server.controller.review;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.dto.review.ReviewSaveRequest;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.review.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/reviews")
@Api(tags = {"리뷰 컨트롤러"})
public class ReviewController {

    @Autowired
    ReviewService reviewService;
    @ApiOperation(value = "회고록 등록", notes = "회고록을 등록한다.")
    @PostMapping
    public ResponseEntity<CommonResponse> createReview(@CurrentUser UserPrincipal userPrincipal, @RequestBody @Valid ReviewSaveRequest request){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", reviewService.createReview(userPrincipal.getId(), request)));
    }
}
