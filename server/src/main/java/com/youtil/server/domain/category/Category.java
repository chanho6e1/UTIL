package com.youtil.server.domain.category;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostCommentList;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Category extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    private String categoryName;

    @Embedded
    private final PostList postList = new PostList();

    public void addCategory(Post post){
        this.postList.getPostList().add(post);
        post.setCategory(this);
    }


}
