package com.youtil.server.repository.post;

import com.youtil.server.domain.post.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    @Transactional
    @Modifying
    @Query("delete from PostLike l where l.post.id = :postId")
    void deleteByPostId(@Param("postId") Long postId);

    Boolean existsByPostIdAndUserId(Long PostId, Long userId);

}
