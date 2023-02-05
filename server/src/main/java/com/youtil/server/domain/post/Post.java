package com.youtil.server.domain.post;

import com.nimbusds.jose.shaded.json.JSONArray;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostSaveRequest;
import com.youtil.server.dto.post.PostUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate

@TypeDef(name = "json", typeClass = JsonStringType.class)
public class Post extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String title;

    @Column(columnDefinition="TEXT")
    private String content;

    private String shortDescription;

    private Integer views;//조회수

    private Integer isPrivate; //공개2, 팔로워1, 비공개0

    private String thumbnail;


    @Embedded
    private final PostCommentList postCommentList = new PostCommentList();

    @Embedded
    private final PostLikeList postLikeList = new PostLikeList();

    @Embedded
    private final PostBookmarkList postBookmarkList = new PostBookmarkList();

    @Type(type = "json")
    @Column(name = "post_files", columnDefinition = "json")
    private Map<Integer, String> postFileMap = new HashMap<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="goal_id")
    private Goal goal;

    @Builder
    public Post(User user, String title, String content, String thumbnail, Integer isPrivate){
        this.user = user;
        this.title = title;
        this.content = content;
        this.thumbnail = thumbnail;
        this.isPrivate = isPrivate;
        this.views=0;
    }


    public void addView() {
        this.views = this.views+1;
    }

    public void update(PostUpdateRequest request){
        this.title = request.getTitle();
        this.content = request.getContent();
        this.isPrivate = request.getIsPrivate();
    }

    public void update(String title, String content){
        this.title = title;
        this.content = content;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void resetCategory() {
        if(this.category != null){
            this.category = null;
        }
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public void resetGoal() {
        if(this.goal != null){
            this.goal = null;
        }
    }

    public void addComment(PostComment postComment){
        this.postCommentList.getPostCommentList().add(postComment);
        postComment.setPost(this);
    }


    public boolean togglePostLike(PostLike postLike) {

        return postLikeList.togglePostLike(postLike);
    }

    public boolean togglePostBookmark(PostBookmark postBookmark) {
        return postBookmarkList.togglePostBookmark(postBookmark);
    }

    public Integer getTotalComments(){
        return postCommentList.size();
    }

    public Integer getTotalLikes(){
        return postLikeList.size();
    }

    public void clearUser() {
        this.user = null;
    }

    public void setThubmnail(String source) {
        this.thumbnail = source;
    }

    public void addPostFile(int idx, String source) {
//        System.out.println("idx: "+idx+"source: "+source);
        postFileMap.put(idx, source);
    }
}