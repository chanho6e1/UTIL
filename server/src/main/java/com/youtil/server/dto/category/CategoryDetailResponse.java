package com.youtil.server.dto.category;

import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.user.User;
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
public class CategoryDetailResponse {

    private Long categoryId;

    private String name;

    private String createdDate;

    private String modifiedDate;

    private List<PostResponse> posts = new ArrayList<>();


    public CategoryDetailResponse(Category category, User user) { //전체 조회

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

        this.categoryId = category.getCategoryId();
        this.name = category.getName();
        this.createdDate = category.getCreatedDate().format(myFormatObj);
        if(category.getModifiedDate()!=null) {
            this.modifiedDate = category.getModifiedDate().format(myFormatObj);
        }
        this.posts = category.getPostList().getPostList().stream()
                .map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }

}
