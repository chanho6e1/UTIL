package com.youtil.server.domain.post;

import com.youtil.server.domain.BaseEntity;
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
    private Post post;

    @Column(nullable = false)
    private Long userId;

    @Builder
    public PostLike(Post post, Long userId){
        this.post = post;
        this.userId = userId;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public boolean ownedBy(Long userId) {
        return this.userId.equals(userId);
    }
}
