package com.youtil.server.controller.tag;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.dto.category.CategorySaveRequest;
import com.youtil.server.dto.post.PostSearch;
import com.youtil.server.dto.tag.TagSaveRequest;
import com.youtil.server.dto.tag.TagUpdateRequest;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.post.PostService;
import com.youtil.server.service.tag.TagService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/tags")
@Api(tags = {"테그 컨트롤러"})
public class TagController {
    @Autowired
    TagService tagService;

    @Autowired
    PostService postService;

    // 관심 테그
    @ApiIgnore
    @ApiOperation(value = "관심 테그 등록", notes = "관심 테그를 등록한다")
    @PostMapping("/likes")
    public ResponseEntity<CommonResponse> findOrCrateTagLike(@ApiIgnore @CurrentUser UserPrincipal user, @RequestBody @Valid TagSaveRequest request) throws Exception {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", tagService.findOrCrateTagLike(user.getId(), request)));
    }
    @ApiOperation(value = "관심 테그 조회", notes = "관심 테그를 조회한다")
    @GetMapping("/likes")
    public ResponseEntity<CommonResponse> getTagLike(@ApiIgnore @CurrentUser UserPrincipal user){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "나의 관심 테그 조회 성공", tagService.getTagLike(user.getId())));
    }

    @ApiOperation(value = "유저별 관심 테그 조회", notes = "유저별 관심 테그를 조회한다")
    @GetMapping("/likes/{userId}")
    public ResponseEntity<CommonResponse> getUserTagLike(@PathVariable Long userId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "유저별 관심 테그 조회 성공", tagService.getUserTagLike(userId)));
    }
    @ApiIgnore
    @ApiOperation(value = "관심 테그 삭제", notes = "관심 테그를 삭제한다")
    @DeleteMapping("/likes")
    public ResponseEntity<CommonResponse> deleteTagLike(@ApiIgnore @CurrentUser UserPrincipal user) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "관심 테그 삭제 성공", tagService.deleteTagLike(user.getId())));
    }
    @ApiIgnore
    @ApiOperation(value = "관심 테그 수정", notes = "관심 테그를 수정한다")
    @PutMapping("/likes")
    public ResponseEntity<CommonResponse> updateTagLike(@ApiIgnore @CurrentUser UserPrincipal user, @RequestBody @Valid TagSaveRequest request) throws Exception {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "관심 테그 수정 성공", tagService.updateTagLike(user.getId(), request)));
    }
    // 포스트 테그
    @ApiIgnore
    @ApiOperation(value = "포스트 테그 등록", notes = "포스트 테그를 등록한다")
    @PostMapping("/posts/{postId}")
    public ResponseEntity<CommonResponse> findOrCrateTagPost(@PathVariable Long postId, @RequestBody @Valid TagSaveRequest request) throws Exception {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "포스트 테그 등록 성공", tagService.findOrCrateTagPost(postId, request)));
    }
    @ApiOperation(value = "포스트 테그 조회", notes = "포스트 id로 테그를 조회한다")
    @GetMapping("/posts/{postId}")
    public ResponseEntity<CommonResponse> getTagLike(@PathVariable Long postId){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "포스트 테그 조회 성공", tagService.getTagByPost(postId)));
    }

    @ApiIgnore
    @ApiOperation(value = "포스트 테그 삭제", notes = "포스트 테그를 삭제한다")
    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<CommonResponse> deleteTagPost(@PathVariable Long postId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "포스트 테그 삭제 성공", tagService.deleteTagPost(postId)));
    }
    @ApiIgnore
    @ApiOperation(value = "포스트 테그 수정", notes = "포스트 테그를 수정한다")
    @PutMapping("/posts/{postId}")
    public ResponseEntity<CommonResponse> updateTagLike(@PathVariable Long postId, @RequestBody @Valid TagSaveRequest request) throws Exception {

        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "포스트 테그 수정 성공", tagService.updateTagPost(postId, request)));
    }
    // 그냥 테그
    @ApiOperation(value = "테그 조회", notes = "테그를 조회한다")
    @GetMapping
    public ResponseEntity<CommonResponse> getTag(){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "테그 조회 성공", tagService.getTag()));
    }

    @ApiIgnore
    @ApiOperation(value = "테그 삭제", notes = "테그를 삭제한다")
    @DeleteMapping("/{tagId}")
    public ResponseEntity<CommonResponse> deleteTag(@PathVariable Long tagId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "카테고리 삭제 성공", tagService.deleteTag(tagId)));
    }

    @ApiIgnore
    @ApiOperation(value = "테그 수정", notes = "해당 테그를 수정한다")
    @PutMapping("/{tagId}")
    public ResponseEntity<CommonResponse> updateTag(@PathVariable Long tagId,
                                                    @RequestBody @Valid TagUpdateRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "테그 수정 성공", tagService.updateTag(tagId, request)));
    }

    //////

    @ApiOperation(value = "정렬 기준(선택)으로 태그별 게시물 리스트 조회", notes = "태그별로,정렬 기준(view/date/like)으로 게시물 목록을 조회한다.")
    @GetMapping("/{tagId}/posts")
    public ResponseEntity<CommonResponse> findByTagPostList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                   @PathVariable Long tagId,
                                                                   @RequestParam(required=false, defaultValue = "date") String criteria,
                                                                   @RequestParam(required=false, defaultValue = "1") int offset,
                                                                   @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "태그별 게시물 목록 조회 성공", tagService.findPostListByTag(user.getId(), tagId, criteria, offset, size))
        );
    }

    @ApiOperation(value = "정렬 기준(선택)으로 태그 이름별 게시물 리스트 조회", notes = "태그 이름별로,정렬 기준(view/date/like)으로 게시물 목록을 조회한다.")
    @GetMapping("names/{tagName}/posts")
    public ResponseEntity<CommonResponse> findByTagNamePostList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                            @PathVariable String tagName,
                                                            @RequestParam(required=false, defaultValue = "date") String criteria,
                                                            @RequestParam(required=false, defaultValue = "1") int offset,
                                                            @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "태그 이름별 게시물 목록 조회 성공", tagService.findPostListByTagName(user.getId(), tagName, criteria, offset, size))
        );
    }

    @ApiOperation(value = "정렬 기준(선택)으로 나의 관심 태그별 게시물 리스트 조회", notes = "나의 관심 태그별로,정렬 기준(view/date/like)으로 게시물 목록을 조회한다.")
    @GetMapping("/mytags")
    public ResponseEntity<CommonResponse> findByMyTagPostList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                                   @RequestParam(required=false, defaultValue = "date") String criteria,
                                                                   @RequestParam(required=false, defaultValue = "1") int offset,
                                                                   @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "태그별 게시물 목록 조회 성공", tagService.findPostListByMyTag(user.getId(), criteria, offset, size))
        );
    }

    @ApiOperation(value = "나의 관심 태그별 유저 리스트 조회", notes = "나의 관심 테그별로, 유저 목록을 조회한다.")
    @GetMapping("/mytags/users")
    public ResponseEntity<CommonResponse> findByMyTagUserPostList(@ApiIgnore @CurrentUser UserPrincipal user,
                                                              @RequestParam(required=false, defaultValue = "1") int offset,
                                                              @RequestParam(value = "size", required = false, defaultValue = "10") int size){
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.OK, "태그별 유저 목록 조회 성공", tagService.findUserListByMyTag(user.getId(), offset, size))
        );
    }
}
