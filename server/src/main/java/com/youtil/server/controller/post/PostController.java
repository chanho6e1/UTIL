package com.youtil.server.controller.post;

import com.youtil.server.common.CommonResponse;
import com.youtil.server.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
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
    @PostMapping("/upload")
//    @PreAuthorize(roles = {"ROLE_AUTH"})
    public ResponseEntity<CommonResponse> createPost(@RequestPart(value="image", required=false) List<MultipartFile> files) throws Exception {
        return ResponseEntity.ok().body(CommonResponse.of(
                HttpStatus.CREATED, "파일 등록 성공", postService.uploadPostFile(files)));
    }

}
