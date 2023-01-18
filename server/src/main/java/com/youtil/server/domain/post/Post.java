package com.youtil.server.domain.post;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

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
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_SEQ")
    private User user;

    private Integer postType; //1:자유 2:익명 3:취업정보 4:질문

    private String title;

    private String content;

    private String shortDescription;

    private Integer views;//조회수

    @Embedded
    private final PostCommentList postComments = new PostCommentList();

    @Embedded
    private final PostLikeList postLikes = new PostLikeList();


    @Builder
    public Post(Integer postType, String title, List<String> contentLists){
        this.postType = postType;
        this.title = title;
        this.views = 0;
//        this.contentLists = contentLists;
    }


    public void addView() {
        this.views++;
    }

    public void update(String title, String content){
        this.title = title;
        this.content = content;
    }


    //    public void addComment(PostComment postComment){
//        this.postComments.getPostPostComments().add(postComment);
//        postComment.setPost(this);
//    }

//    public boolean togglePostLike(PostLike postLike) {
//        return postLikes.togglePostLike(postLike);
//    }
//
//    public int getTotalComments(){
//        return postComments.size();
//    }
//
//    public int getTotalLikes(){
//        return postLikes.size();
//    }

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

//    public void addContent(PostContent content) {
//        this.contentLists.add(content);
//
//        if(content.getPost() != this)
//            content.setPost(this);
//    }

 }