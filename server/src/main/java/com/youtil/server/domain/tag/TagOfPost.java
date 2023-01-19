package com.youtil.server.domain.tag;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.post.Post;

import javax.persistence.*;

@Entity
public class TagOfPost extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_of_post_id")
    private Long tagOfPostId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
