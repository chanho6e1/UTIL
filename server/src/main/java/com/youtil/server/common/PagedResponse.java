package com.youtil.server.common;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
public class PagedResponse<T> {
    private Object content;
//    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean last;

    public PagedResponse(Object content, int page, int size, long totalElements, int totalPages, boolean last) {
//        setContent(content);
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.last = last;
    }

//    public PagedResponse(List<T> content, int page, int size, long totalElements, int totalPages, boolean last) {
//        setContent(content);
//        this.content = content;
//        this.page = page; // ban
//        this.size = size;
//        this.totalElements = totalElements;
//        this.totalPages = totalPages; // ban
//        this.last = last;
//    }

    public final void setContent(List<T> content) {
        if (content == null) {
            this.content = null;
        } else {
            this.content = Collections.unmodifiableList(content);
        }
    }
}