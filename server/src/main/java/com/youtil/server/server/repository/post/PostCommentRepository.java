package com.youtil.server.server.repository.post;

import com.youtil.server.domain.post.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {

    @Transactional
    @Modifying
    @Query("delete from PostComment c where c.post.id = :postId")
    void deleteByPostId(@Param("postId") Long postId);
}

