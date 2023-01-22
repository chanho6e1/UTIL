package com.youtil.server.domain.post;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostCommentSaveRequest;
import com.youtil.server.dto.post.PostSaveRequest;
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
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="post_id")
    private Post post;

    private Long parentId; //대댓글이 달릴 댓글

    private String parentWriterNickName;

    private String content;

    public void setPost(Post post) {
        this.post = post;
    }

    @Builder
    public PostComment(User user, Post post, String content, Long parentId, String parentWriterNickName) {
        this.user = user;
        this.post = post;
        this.content = content;
        this.parentId = parentId;
        this.parentWriterNickName = parentWriterNickName;
    }

    public void update(PostCommentSaveRequest request){
        this.parentId = request.getParentId();
        this.content = request.getContent();
    }

    public User nestedToInfo(Long commentId){

        if(this.commentId==commentId){
            return this.user;
        }

        return null;
    }


}
