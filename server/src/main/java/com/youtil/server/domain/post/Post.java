package com.youtil.server.domain.post;

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

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
//@Table(name = "posts")
public class Post extends BaseEntity {

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
        this.thumbnail = request.getThumbnail();
        this.isPrivate = request.getIsPrivate();
    }

    public boolean setCategory(Category category) {
        this.category = category;
        return true;
    }

    public boolean resetCategory() {
        if(this.category != null){
            this.category = null;
            return true;
        }
        return false;
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

//    public int getTotalFiles(){
//        return fileLists.size();
//    }

    // Board에서 파일 처리 위함

//    public void addPostFile(PostFile postfile) {
//        this.fileLists.add(postfile);
//
//        // 게시글에 파일이 저장되어있지 않은 경우
//        if(postfile.getPost() != this)
//            // 파일 저장
//            postfile.setPost(this);
//    }

 }