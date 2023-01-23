package com.youtil.server.controller.post;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.common.PagedResponse;
import com.youtil.server.dto.post.PostCommentResponse;
import com.youtil.server.dto.post.PostCommentSaveRequest;
import com.youtil.server.oauth.config.LoginUser;
import com.youtil.server.oauth.entity.SessionUser;
import com.youtil.server.service.post.PostCommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/comments")
@Api(tags = {"포스트 댓글 컨트롤러"})
public class PostCommentController {

    @Autowired
    PostCommentService postCommentService;


    @ApiOperation(value = "해당 게시물의 원댓글 리스트 조회", notes = "게시물 postId를 입력받은 후 게시물 목록을 조회한다. (최신 날짜순)")
    @GetMapping("/{postId}/parent")
    public ResponseEntity<CommonResponse> findPostCommentParentList(@PathVariable Long postId,
                                                       @RequestParam(value = "order", required = false, defaultValue = "1") Integer order,
                                                       @RequestParam(value = "cursor", required = false) Long cursor,
                                                       @RequestParam(value = "size", required = false, defaultValue = "10") int size) {

        Sort.Direction sort = Sort.Direction.DESC;
        String comparisonOperator = "<";
        if (order == -1) {
            sort = Sort.Direction.ASC;
            comparisonOperator = ">";
        }

        PagedResponse<PostCommentResponse> response = null;
        response = postCommentService.findParentCommentList(postId, sort, comparisonOperator, cursor, size);

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "해당 게시물의 원댓글 목록 조회 성공", response)
        );
    }

    @ApiOperation(value = "해당 댓글의 대댓글 리스트 조회", notes = "게시물 postId를 입력받은 후 게시물 목록을 조회한다. (최신 날짜순)")
    @GetMapping("/{commentId}/child")
    public ResponseEntity<CommonResponse> findPostCommentChildList(@PathVariable Long postId,
                                                       @RequestParam(value = "order", required = false, defaultValue = "1") Integer order,
                                                       @RequestParam(value = "cursor", required = false) Long cursor,
                                                       @RequestParam(value = "size", required = false, defaultValue = "5") int size) {

        Sort.Direction sort = Sort.Direction.DESC;
        String comparisonOperator = "<";
        if (order == -1) {
            sort = Sort.Direction.ASC;
            comparisonOperator = ">";
        }

        PagedResponse<PostCommentResponse> response = null;
        response = postCommentService.findChildCommentList(postId, sort, comparisonOperator, cursor, size);

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "대댓글 조회 성공", response)
        );
    }

    @ApiOperation(value = "댓글 등록", notes = "댓글을 등록한다")
    @PostMapping("/{postId}")
    public ResponseEntity<CommonResponse> createPost(@LoginUser SessionUser user, @PathVariable Long postId, @RequestBody @Valid PostCommentSaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", postCommentService.createPostComment(user.getId(), postId, request)));
    }

    @ApiOperation(value = "댓글 수정", notes = "댓글을 수정한다")
    @PutMapping("/{commentId}")
    public ResponseEntity<CommonResponse> updatepost(@LoginUser SessionUser user, @PathVariable Long commentId,
                                                     @RequestBody @Valid PostCommentSaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", postCommentService.updatePostComment(user.getId(), commentId, request)));
    }

    @ApiOperation(value = "댓글 삭제", notes = "단일 댓글을 삭제한다")
    @DeleteMapping("/{commentId}")
    public ResponseEntity<CommonResponse> deletepost(@LoginUser SessionUser user, @PathVariable Long commentId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "삭제 성공", postCommentService.deletePostComment(user.getId(), commentId)));
    }
}
