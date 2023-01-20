package com.youtil.server.server.domain.post;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.post.PostComment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Getter
@NoArgsConstructor
@Entity
public class CommentLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id", nullable = false)
    private PostComment postComment;

    @Column(nullable = false)
    private Long userId;

    @Builder
    public CommentLike(PostComment postComment, Long userId){
        this.postComment = postComment;
        this.userId = userId;
    }

    public void setPostComment(PostComment postComment) {
        this.postComment = postComment;
    }

    public boolean ownedBy(Long userId) {
        return this.userId.equals(userId);
    }

}
