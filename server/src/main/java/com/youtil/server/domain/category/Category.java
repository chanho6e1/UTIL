package com.youtil.server.domain.category;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostCommentList;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
public class Category extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @Embedded
    private final PostList postList = new PostList();

    public void addCategory(Post post){
        this.postList.getPostList().add(post);
        post.setCategory(this);
    }

    public void clearUser(){
        this.user = null;
    }

    @Builder
    public Category(String name, User user) {
        this.name = name;
        this.user = user;
    }


    public void update(String name){
        this.name = name;
    }
}
