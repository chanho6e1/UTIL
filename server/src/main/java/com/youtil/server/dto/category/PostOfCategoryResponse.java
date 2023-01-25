package com.youtil.server.dto.category;

import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostCommentResponse;
import com.youtil.server.dto.post.PostResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostOfCategoryResponse {

    private Long categoryId;

    private List<PostResponse> posts = new ArrayList<>();

//    private String createdDate;
//
//    private String modifiedDate;

    public PostOfCategoryResponse(Category category, User user) { //전체 조회

        this.categoryId = category.getCategoryId();
        this.posts = category.getPostList().getPostList().stream()
                        .map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }

}
