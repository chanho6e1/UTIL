package com.youtil.server.repository.post;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.dto.post.PostResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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


//    @EntityGraph(attributePaths = {"user"})
    @Query("select p from Post p where p.postId = :postId")
    Optional<Post> findPost(@Param("postId") Long postId);

    @Query("SELECT p FROM Post p left join PostLike l on l.post.postId = p.postId where p.user.userId in (SELECT f.toUser.userId FROM Follow f where f.fromUser.userId = :userId) " +
            "group by p.postId")
    Slice<Post> findByPostSubscribes(@Param("userId")Long userId, Pageable pageable);


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

//    @Query("select p from Post p where p.user in (select f.toUser from Follow f where f.fromUser = :userId)")
//    List<PostResponse> findPostSubscribe(@Param("userId") Long userId, Pageable pageable);
//
//    @Query("select p from Post p where p.user in (select f.toUser from Follow f where f.fromUser = :userId) order by :criteria desc")
//    List<PostResponse> findPostSubscribeRank(@Param("criteria") String criteria, @Param("userId") Long userId, Pageable pageable);

}
