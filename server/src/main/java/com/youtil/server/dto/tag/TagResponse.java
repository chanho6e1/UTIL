package com.youtil.server.dto.tag;

import com.youtil.server.domain.tag.Tag;
import com.youtil.server.domain.user.UserOfTag;
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

    public TagResponse(Tag tag){
        this.tagId = tag.getTagId();
        this.tagName = tag.getTagName();
    }

    public TagResponse(UserOfTag userOfTag) {
        this.tagId = userOfTag.getTag().getTagId();
        this.tagName = userOfTag.getTag().getTagName();
    }
}
