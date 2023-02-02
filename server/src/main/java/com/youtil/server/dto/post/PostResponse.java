package com.youtil.server.dto.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PostResponse {

    private Long postId;

    private WriterInfo writerInfo;

    private String title;

    private String content;

    private String thumbnail;

    private Integer isPrivate;

    private Integer views;

    private List<PostCommentResponse> comments = new ArrayList<>();

    private Integer totalCommentSize;

    private Integer likeStatusSize;

    private Boolean likeStatus;

    private Boolean bookmarkStatus;

    private String createdDate;

    private String modifiedDate;


    public PostResponse(Post post, User user) { //전체 조회

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        this.writerInfo = WriterInfo.from(post.getUser());
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.content = post.getContent();

        Document doc = Jsoup.parse(post.getContent());
        Elements images = doc.getElementsByTag("img");


        this.createdDate = post.getCreatedDate().format(myFormatObj);
        if(post.getModifiedDate()!=null) {
            this.modifiedDate = post.getModifiedDate().format(myFormatObj);
        }
        this.isPrivate = post.getIsPrivate();
        this.thumbnail = post.getThumbnail();
        this.likeStatus = post.getPostLikeList().getPostLikeList().parallelStream()
                .anyMatch(l -> l.ownedBy(user.getUserId()));
        this.likeStatusSize = post.getTotalLikes();
        this.bookmarkStatus = post.getPostBookmarkList().getPostBookmarkList().parallelStream()
                .anyMatch((b)-> b.ownedBy(user.getUserId()));
    }

    public PostResponse(Post post, Boolean likeStatus, Boolean bookmarkStatus) { //단건 조회

        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        this.writerInfo = WriterInfo.from(post.getUser());
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.views = post.getViews();
        this.createdDate = post.getCreatedDate().format(myFormatObj);
        if(post.getModifiedDate()!=null) {
            this.modifiedDate = post.getModifiedDate().format(myFormatObj);
        }
        this.isPrivate = post.getIsPrivate();
        this.thumbnail = post.getThumbnail();
        this.likeStatus = likeStatus;
        this.totalCommentSize = post.getTotalComments(); //댓글 수
        this.likeStatusSize = post.getTotalLikes(); //좋아요 수
        this.bookmarkStatus = bookmarkStatus;
    }
}
