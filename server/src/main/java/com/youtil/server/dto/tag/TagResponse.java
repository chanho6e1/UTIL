package com.youtil.server.dto.tag;

import com.youtil.server.domain.tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TagResponse {
    private Long tagId;
    private String tagName;
    private String createdDate;
    private String modifiedDate;

    public TagResponse(Tag tag){
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분 ss초");
        this.tagId = tag.getTagId();
        this.tagName = tag.getTagName();
        this.createdDate = tag.getCreatedDate().format(myFormatObj);
        if(tag.getModifiedDate()!=null) {
            this.modifiedDate = tag.getModifiedDate().format(myFormatObj);
        }
    }
}
