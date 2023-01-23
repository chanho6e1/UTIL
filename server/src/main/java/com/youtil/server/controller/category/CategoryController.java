package com.youtil.server.controller.category;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.dto.category.CategorySaveRequest;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import com.youtil.server.service.category.PostCategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/categorys")
@Api(tags = {"카테고리 컨트롤러"})
public class CategoryController {

    @Autowired
    PostCategoryService postCategoryService;

    @ApiOperation(value = "카테고리 등록", notes = "카테고리를 등록한다")
    @PostMapping
    public ResponseEntity<CommonResponse> createCategory(@CurrentUser UserPrincipal user, @RequestBody @Valid CategorySaveRequest request){
        System.out.println(request.getName());
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "등록 성공", postCategoryService.createCategory(user.getId(), request)));
    }

    @ApiOperation(value = "해당 카테고리에 게시물을 등록", notes = "해당 카테고리에 게시물을 등록")
    @PutMapping("/{catogoryId}/posts/{postId}")
    public ResponseEntity<CommonResponse> setCategory(@PathVariable Long catogoryId, @PathVariable Long postId) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "해당 카테고리에 게시물 등록 성공", postCategoryService.setCategory(catogoryId, postId)));
    }

    @ApiOperation(value = "해당 카테고리에 게시물을 삭제", notes = "해당 카테고리에 게시물을 삭제")
    @PutMapping("/{catogoryId}/deletes/{postId}")
    public ResponseEntity<CommonResponse> resetCategory(@PathVariable Long catogoryId,@PathVariable Long postId) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "해당 카테고리에 게시물 삭제 성공", postCategoryService.resetCategory(catogoryId, postId)));
    }

    @ApiOperation(value = "카테고리 수정", notes = "해당 카테고리를 수정한다")
    @PutMapping("/{catogoryId}")
    public ResponseEntity<CommonResponse> updatepost(@PathVariable Long catogoryId,
                                                     @RequestBody @Valid CategorySaveRequest request) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "카테고리 수정 성공", postCategoryService.updateCategory(catogoryId, request)));
    }

    @ApiOperation(value = "카테고리 삭제", notes = "카테고리를 삭제한다")
    @DeleteMapping("/{catogoryId}")
    public ResponseEntity<CommonResponse> deletepost(@PathVariable Long catogoryId) {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.NO_CONTENT, "카테고리 삭제 성공", postCategoryService.deleteCategory(catogoryId)));
    }
}
