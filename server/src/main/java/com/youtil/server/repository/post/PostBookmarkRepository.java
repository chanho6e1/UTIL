package com.youtil.server.repository.post;

import com.youtil.server.domain.post.PostBookmark;
import com.youtil.server.domain.post.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PostBookmarkRepository extends JpaRepository<PostBookmark, Long> {

    @Query("select b from PostBookmark b where b.post.postId = :postId and b.user.userId = :userId")
    Optional<PostBookmark> existsByPostIdAndUserId(@Param("postId")Long PostId, @Param("userId")Long userId);
}
