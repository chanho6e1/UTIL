package com.youtil.server.repository.post;

import com.youtil.server.domain.post.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    @Query("select p from PostLike p where p.post.postId = :postId and p.user.userId = :userId")
    Optional<PostLike> existsByPostIdAndUserId(@Param("postId")Long PostId, @Param("userId")Long userId);

}
