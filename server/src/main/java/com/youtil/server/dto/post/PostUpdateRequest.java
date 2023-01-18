package com.youtil.server.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PostUpdateRequest {
    private String title;
    private String content;

    public static PostUpdateRequest from(String title, String content){
        return new PostUpdateRequest(title, content);
    }


}
