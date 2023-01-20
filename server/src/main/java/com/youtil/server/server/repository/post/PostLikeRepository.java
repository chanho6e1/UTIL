package com.youtil.server.server.repository.post;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
//    @Transactional
//    @Modifying
//    @Query("delete from PostLike l where l.post.id = :postId")
//    void deleteByPostId(@Param("postId") Long postId);
//
    @Query("select p from PostLike p where p.post.postId = :postId and p.user.userId = :userId")
    Optional<PostLike> existsByPostIdAndUserId(@Param("postId")Long PostId, @Param("userId")Long userId);

}
