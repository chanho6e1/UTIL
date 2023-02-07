package com.youtil.server.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostSearch {

    private String title;

    private String criteria;

    public PostSearch(String criteria){
        this.criteria = criteria;
    }

    public static PostSearch of(String title, String criteria){
        return new PostSearch(title.toLowerCase(), criteria);
    }

    public static PostSearch of(String criteria){
        return new PostSearch(criteria);
    }

}
