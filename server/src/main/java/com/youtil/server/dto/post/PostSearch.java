package com.youtil.server.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostSearch {

    private String content;

    private String criteria;

    public PostSearch(String criteria){
        this.criteria = criteria;
    }


    public static PostSearch of(String content, String criteria){
        return new PostSearch(content, criteria);
    }

    public static PostSearch of(String criteria){
        return new PostSearch(criteria);
    }

}
