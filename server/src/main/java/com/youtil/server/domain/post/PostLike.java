package com.youtil.server.domain.post;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.user.User;
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
public class PostLike extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Post_id", nullable = false)
    private Post post;

//    @Column(nullable = false)
//    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    private Boolean likeStatus;

    @Builder
    public PostLike(Post post, User user){
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
