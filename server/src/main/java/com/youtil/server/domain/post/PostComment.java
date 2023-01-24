package com.youtil.server.domain.post;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostCommentSaveRequest;
import com.youtil.server.dto.post.PostCommentUpdateRequest;
import com.youtil.server.dto.post.PostSaveRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicInsert //@DynamicInsert사용
@DynamicUpdate
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private PostComment parent;

    @OneToMany(mappedBy = "parent", orphanRemoval = true)
    private List<PostComment> children = new ArrayList<>();

    private Integer depth;//0과1

    private String content;

    @ColumnDefault("false")
    private Boolean isDelete; //삭제여부

    public void setPost(Post post) {
        this.post = post;
    }

    @Builder
    public PostComment(User user, Post post, String content, PostComment parent, Integer depth) {
        this.user = user;
        this.post = post;
        this.content = content;
        this.parent = parent;
        this.depth = depth;
    }

    public void update(PostCommentUpdateRequest request){
        this.content = request.getContent();
    }


    public User nestedToInfo(Long commentId){

        if(this.commentId==commentId){
            return this.user;
        }
        return null;
    }

    public void setChild(PostComment postComment) {
        this.children.add(postComment);
    }

    public void updateDeleteStatus() {
        this.isDelete = true;
        this.content = null;
    }

    public void clearUser(){
        this.user = null;
    }

    public void resetChild(PostComment postComment) {
        this.parent = postComment;
    }

    public String getParentNickname(PostComment postComment) {
        if(postComment.getParent().user.getUserName()!=null) {
            return postComment.getParent().user.getUserName();
        }else{
            return null;
        }
    }

}
