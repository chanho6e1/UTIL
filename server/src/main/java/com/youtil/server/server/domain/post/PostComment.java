package com.youtil.server.server.domain.post;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Getter
@NoArgsConstructor
@Entity
public class PostComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="post_id")
    private com.youtil.server.domain.post.Post post;


    private String content;

    public void setPost(com.youtil.server.domain.post.Post post) {
        this.post = post;
    }

    @Builder
    public PostComment(User user, Post post, String content) {
        this.user = user;
        this.post = post;
        this.content = content;
    }

    public void update(String content){
        this.content = content;
    }
}
