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
public class PostLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Post_id", nullable = false)
    private com.youtil.server.domain.post.Post post;

//    @Column(nullable = false)
//    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    private Boolean likeStatus;

    @Builder
    public PostLike(com.youtil.server.domain.post.Post post, User user){
        this.post = post;
        this.user = user;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public boolean ownedBy(Long userId) {
        return this.user.getUserId().equals(userId);
    }
}
