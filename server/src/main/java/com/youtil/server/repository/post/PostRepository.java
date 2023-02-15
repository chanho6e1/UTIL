package com.youtil.server.repository.post;

import com.youtil.server.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository  extends JpaRepository<Post, Long> {


    @Query("select p from Post p where p.postId = :postId")
    Optional<Post> findPost(@Param("postId") Long postId);


    @Query(value = "SELECT p.* FROM post p where p.created_date between DATE_SUB(now(), INTERVAL 6 MONTH) and now()", nativeQuery = true)
    List<Post> findPostByCreateTime();

    @Transactional
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("delete from TagOfPost t where t.post.postId = :postId")
    void deletePostTag(@Param("postId")Long postId);


    @Transactional
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("delete from PostLike l where l.post.postId = :postId")
    void deletePostLike(@Param("postId")Long postId);

    @Transactional
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("delete from PostBookmark b where b.post.postId = :postId")
    void deletePostBookmark(@Param("postId")Long postId);


}
