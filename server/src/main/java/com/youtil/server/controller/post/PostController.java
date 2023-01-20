package com.youtil.server.controller.post;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.dto.post.PostSaveRequest;
import com.youtil.server.dto.post.PostSearch;
import com.youtil.server.dto.post.PostUpdateRequest;
import com.youtil.server.oauth.config.LoginUser;
import com.youtil.server.oauth.entity.SessionUser;
import com.youtil.server.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/posts")
@Api(tags = {"포스트 컨트롤러"})
public class PostController {

    @Autowired
    PostService postService;

    @ApiOperation(value = "파일 업로드 등록", notes = "파일을 업로드하고 주소를 반환한다")
    @PostMapping("/files")
    public ResponseEntity<CommonResponse> uploadFile(@RequestPart(value="image", required=false) List<MultipartFile> files) throws Exception {
//        System.out.println(files);
        return ResponseEntity.ok().body(CommonResponse.of(
                               HttpStatus.CREATED, "파일 등록 성공", postService.uploadPostFile(files)));
    }

    @ApiOperation(value = "단일 게시물 조회", notes = "게시물 id로 게시물을 조회한다.")
    @GetMapping("/{postId}")
    public ResponseEntity<CommonResponse> getPost(@LoginUser SessionUser user, @PathVariable Long postId) {

        System.out.println(
                user.getId()
        );
             return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "단일 조회 성공", postService.findPost(postId, user.getId())
        ));
    }

    @ApiOperation(value = "내가 쓴 게시물 리스트 조회", notes = "내가 쓴 게시물 목록을 조회한다.(최근날짜순)")
    @GetMapping("/users")
    public ResponseEntity<CommonResponse> findPostListByUser(@LoginUser SessionUser user, @RequestParam(required=false) int offset) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "나의 게시물 목록 조회 성공", postService.findPostListByUser(user.getId(), offset))
        );
    }

    @ApiOperation(value = "정렬 기준(선택)으로 게시물 리스트 조회", notes = "정렬 기준(view, like, date)을 받은 후 전체 게시물 목록을 조회한다. 디폴트는 최신 날짜순")
    @GetMapping("/lists")
    public ResponseEntity<CommonResponse> findPostList(@RequestParam(required=false) String criteria, @RequestParam int offset) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "정렬 기준별 게시물 목록 조회 성공", postService.findPostList(criteria, offset))
        );
    }

    @ApiOperation(value = "정렬 기준(선택)으로 내가 구독한 사람의 게시물 리스트 조회", notes = "내가 구독한 사람만,정렬 기준(view/date/like)으로 게시물 목록물 목록을 조회한다.")
    @GetMapping("/subscribes")
    public ResponseEntity<CommonResponse> findBySubscribesPostList(@LoginUser SessionUser user,
                                                               @RequestParam(required=false) String criteria,
                                                               @RequestParam int offset) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "구독한 사람의 게시물 목록 조회 성공", postService.findByPostSubscribes(PostSearch.of(criteria), user.getId(), offset))
        );
    }


    @ApiOperation(value = "내용 검색, 정렬 기준(선택)으로 게시물 리스트 조회", notes = "내용 검색,정렬 기준(view/date/like)으로 게시물 목록물 목록을 조회한다.")
    @GetMapping("/search")
    public ResponseEntity<CommonResponse> findBySearchPostList(@RequestParam String content,
                                                               @RequestParam(required=false) String criteria,
                                                               @RequestParam int offset) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "내용검색, 정렬 기준으로 게시물 목록 조회 성공", postService.findByPostContent(PostSearch.of(content, criteria), offset))
        );
    }


    @ApiOperation(value = "게시물 등록", notes = "게시물을 등록한다")
    @PostMapping
    public ResponseEntity<CommonResponse> createPost(@LoginUser SessionUser user, @RequestBody @Valid PostSaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", postService.createPost(user.getId(), request)));
    }

    @ApiOperation(value = "게시물 수정", notes = "해당 게시물을 수정한다")
    @PutMapping("/{postId}")
    public ResponseEntity<CommonResponse> updatepost(@LoginUser SessionUser user, @PathVariable Long postId,
                                                     @RequestBody @Valid PostUpdateRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", postService.updatePost(user.getId(), postId, request)));
    }

    @ApiOperation(value = "게시물 삭제", notes = "단일 게시물을 삭제한다")
    @DeleteMapping("/{postId}")
    public ResponseEntity<CommonResponse> deletepost(@LoginUser SessionUser user, @PathVariable Long postId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "삭제 성공", postService.deletePost(user.getId(), postId)));
    }

    @ApiOperation(value = "게시물 좋아요 토글", notes = "단일 게시물에 대한 좋아요 선택/해제한다")
    @PutMapping("/{postId}/likes")
    public ResponseEntity<CommonResponse> togglePostLikes(@LoginUser SessionUser user,
                                                              @PathVariable Long postId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "좋아요 성공", postService.togglePostLikes(user.getId(), postId)));
    }

    @ApiOperation(value = "해당 게시물을 좋아요한 유저를 반환한다", notes = "해당 게시물을 좋아요한 유저 프로필이미지와 닉네임을 반환한다")
    @GetMapping("/{postId}/likes/users")
    public ResponseEntity<CommonResponse> PostLikesPeople(@LoginUser SessionUser user,
                                                          @PathVariable Long postId, @RequestParam(required=false) int offset) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "좋아요한 유저 리스트 반환 성공", postService.PostLikesPeople(user.getId(), postId, offset)));
    }
}
