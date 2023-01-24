package com.youtil.server.dto.category;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.post.PostComment;
import com.youtil.server.dto.post.WriterInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

    private Long categoryId;

    private String name;

    private String createdDate;

    private String modifiedDate;

    public CategoryResponse(Category category) { //전체 조회

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

        this.categoryId = category.getCategoryId();
        this.name = category.getName();
        this.createdDate = category.getCreatedDate().format(myFormatObj);
        if(category.getModifiedDate()!=null) {
            this.modifiedDate = category.getModifiedDate().format(myFormatObj);
        }
    }

}
