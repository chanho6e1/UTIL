package com.youtil.server.controller.post;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.dto.post.PostContentRequest;
import com.youtil.server.dto.post.PostSaveRequest;
import com.youtil.server.dto.post.PostSearch;
import com.youtil.server.dto.post.PostUpdateRequest;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.post.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/api/posts")
@Api(tags = {"포스트 컨트롤러"})
public class PostController {

    @Autowired
    PostService postService;

    @ApiOperation(value = "단일 게시물 조회", notes = "게시물 id로 게시물을 조회한다.")
    @GetMapping("/{postId}")
    public ResponseEntity<CommonResponse> getPost(@ApiIgnore @CurrentUser UserPrincipal user, @PathVariable Long postId) {

        System.out.println(
                user.getId()
        );
             return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "단일 조회 성공", postService.findPost(postId, user.getId())
        ));
    }

    @ApiOperation(value = "내가 쓴 게시물 리스트 조회", notes = "내가 쓴 게시물 목록을 조회한다.(최근날짜순)")
    @GetMapping("/users")
    public ResponseEntity<CommonResponse> findPostListByMy(@ApiIgnore @CurrentUser UserPrincipal user,
                                                           @RequestParam(required=false, defaultValue = "date") String criteria,
                                                           @RequestParam(required=false, defaultValue = "1") int offset,
                                                             @RequestParam(value = "size", required = false, defaultValue = "10") int size) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "나의 게시물 목록 조회 성공", postService.findPostListByUser(user.getId(), offset, size, criteria))
        );
    }

    @ApiOperation(value = "유저별 게시물 리스트 조회", notes = "유저별 게시물 목록을 조회한다.(최근날짜순)")
    @GetMapping("/users/{userId}")
    public ResponseEntity<CommonResponse> findPostListByUser(@ApiIgnore @CurrentUser UserPrincipal user,
                                                             @PathVariable("userId") Long userId,
                                                             @RequestParam(required=false, defaultValue = "date") String criteria,
                                                             @RequestParam(required=false, defaultValue = "1") int offset,
                                                             @RequestParam(value = "size", required = false, defaultValue = "10") int size) {


        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유저별 게시물 목록 조회 성공", postService.findPostListBySpecUser(userId, offset, size, criteria, user.getId()))
        );
    }

    @ApiOperation(value = "정렬 기준(선택)으로 게시물 리스트 조회", notes = "정렬 기준(view, like, date)을 받은 후 전체 게시물 목록을 조회한다. 디폴트는 최신 날짜순")
    @GetMapping("/lists")
    public ResponseEntity<CommonResponse> findPostList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                       @RequestParam(required=false, defaultValue = "date") String criteria,
                                                       @RequestParam(required=false, defaultValue = "1") int offset,
                                                       @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "정렬 기준별 게시물 목록 조회 성공", postService.findPostList(user.getId(), criteria, offset, size))
        );
    }


    @ApiOperation(value = "정렬 기준(선택)으로 내가 구독한 사람의 게시물 리스트 조회", notes = "내가 구독한 사람만,정렬 기준(view/date/like)으로 게시물 목록물 목록을 조회한다.")
    @GetMapping("/subscribes")
    public ResponseEntity<CommonResponse> findBySubscribesPostList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                   @RequestParam(required=false, defaultValue = "date") String criteria,
                                                                   @RequestParam(required=false, defaultValue = "1") int offset,
                                                                   @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "구독한 사람의 게시물 목록 조회 성공", postService.findByPostSubscribes(PostSearch.of(criteria), user.getId(), offset, size))
        );
    }



    @ApiOperation(value = "제목 검색, 정렬 기준(선택)으로 게시물 리스트 조회", notes = "제목 검색,정렬 기준(view/date/like)으로 게시물 목록물 목록을 조회한다.")
    @GetMapping("/search")
    public ResponseEntity<CommonResponse> findBySearchPostList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                               @RequestParam String title,
                                                               @RequestParam(required=false, defaultValue = "date") String criteria,
                                                               @RequestParam(required=false, defaultValue = "1") int offset,
                                                               @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "내용검색, 정렬 기준으로 게시물 목록 조회 성공", postService.findByPostTitle(user.getId(), PostSearch.of(title, criteria), offset, size))
        );
    }

    @ApiOperation(value = "닉네임 검색, 정렬 기준(선택)으로 게시물 리스트 조회", notes = "제목 검색,정렬 기준(view/date/like)으로 게시물 목록물 목록을 조회한다.")
    @GetMapping("/search/nickName")
    public ResponseEntity<CommonResponse> findBySearchNickName(@ApiIgnore @CurrentUser UserPrincipal user,
                                                               @RequestParam String nickName,
                                                               @RequestParam(required=false, defaultValue = "date") String criteria,
                                                               @RequestParam(required=false, defaultValue = "1") int offset,
                                                               @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "내용검색, 정렬 기준으로 게시물 목록 조회 성공", postService.findByNickName(user.getId(), PostSearch.of(nickName, criteria), offset, size))
        );
    }

    @ApiOperation(value = "정렬 기준(선택)으로 내가 좋아요한 게시물 리스트 조회", notes = "정렬 기준(view/date/like)으로 내가 좋아요한 게시물 목록물 목록을 조회한다.")
    @GetMapping("/likes")
    public ResponseEntity<CommonResponse> findByLikePostList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                             @RequestParam(required=false, defaultValue = "date") String criteria,
                                                               @RequestParam(required=false, defaultValue = "1") int offset,
                                                               @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "정렬 기준으로 내가 좋아요한 게시물 목록 조회 성공", postService.findByLikePostList(user.getId(), criteria, offset, size))
        );
    }

    @ApiOperation(value = "정렬 기준(선택)으로 내가 북마크한 게시물 리스트 조회", notes = "정렬 기준(view/date/like)으로 내가 북마크한 게시물 목록물 목록을 조회한다.")
    @GetMapping("/bookmarks")
    public ResponseEntity<CommonResponse> findByBookmarkPostList(@ApiIgnore @CurrentUser UserPrincipal user,
@RequestParam(required=false, defaultValue = "date") String criteria,
                                                             @RequestParam(required=false, defaultValue = "1") int offset,
                                                             @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "정렬 기준으로 내가 북마크한 게시물 목록 조회 성공", postService.findByBookmarkPostList(user.getId(), criteria, offset, size))
        );
    }



    //////////////
    @ApiIgnore
    @ApiOperation(value = "게시물 등록", notes = "게시물을 등록한다")
    @PostMapping
    public ResponseEntity<CommonResponse> createPost(@ApiIgnore @CurrentUser UserPrincipal user, @RequestBody @Valid PostSaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", postService.createPost(user.getId(), request)));
    }
    @ApiIgnore
    @ApiOperation(value = "게시물 수정", notes = "해당 게시물을 수정한다")
    @PutMapping("/{postId}")
    public ResponseEntity<CommonResponse> updatepost(@ApiIgnore @CurrentUser UserPrincipal user, @PathVariable Long postId,
                                                     @RequestBody @Valid PostUpdateRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "수정 성공", postService.updatePost(user.getId(), postId, request)));
    }
    @ApiIgnore
    @ApiOperation(value = "게시물 삭제", notes = "단일 게시물을 삭제한다")
    @DeleteMapping("/{postId}")
    public ResponseEntity<CommonResponse> deletepost(@ApiIgnore @CurrentUser UserPrincipal user, @PathVariable Long postId) throws UnsupportedEncodingException {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "삭제 성공", postService.deletePost(user.getId(), postId)));
    }

    ////////////////////
    @ApiIgnore
    @ApiOperation(value = "게시물 좋아요 토글", notes = "단일 게시물에 대한 좋아요 선택/해제한다")
    @PutMapping("/{postId}/likes")
    public ResponseEntity<CommonResponse> togglePostLikes(@ApiIgnore @CurrentUser UserPrincipal user,
                                                              @PathVariable Long postId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "좋아요 성공", postService.togglePostLikes(user.getId(), postId)));
    }
    @ApiIgnore
    @ApiOperation(value = "북마크 토글", notes = "단일 게시물에 대한 북마크를 선택/해제한다")
    @PutMapping("/{postId}/bookmarks")
    public ResponseEntity<CommonResponse> togglePostBookmarks(@ApiIgnore @CurrentUser UserPrincipal user,
                                                          @PathVariable Long postId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "북마크 성공", postService.togglePostBookmarks(user.getId(), postId)));
    }


    @ApiOperation(value = "해당 게시물을 좋아요한 유저를 반환한다", notes = "해당 게시물을 좋아요한 유저 프로필이미지와 닉네임을 반환한다")
    @GetMapping("/{postId}/likes/users")
    public ResponseEntity<CommonResponse> PostLikesPeople(@ApiIgnore @CurrentUser UserPrincipal user,
                                                          @PathVariable Long postId,
                                                          @RequestParam(required=false, defaultValue = "1") int offset,
                                                          @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "좋아요한 유저 리스트 반환 성공", postService.PostLikesPeople(postId, offset, size)));
    }

    ////////////////

    @ApiOperation(value = "섬네일 후보를 반환한다", notes = "content를 보내주면 섬네일 후보를 반환한다")
    @GetMapping("/thumbnail")
    public ResponseEntity<CommonResponse> getThumbnailCandidate(@RequestBody @Valid PostContentRequest request){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "섬네일 후보 반환 성공", postService.getThumbnailCandidate(request)));
    }
}
