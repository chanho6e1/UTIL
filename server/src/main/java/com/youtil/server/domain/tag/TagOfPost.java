package com.youtil.server.domain.tag;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.post.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@DynamicUpdate
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

    public TagOfPost(Post post, Tag findTags) {
        this.post = post;
        this.tag = findTags;
    }
}
