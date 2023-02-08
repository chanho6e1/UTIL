package com.youtil.server.repository.post;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.dto.post.PostResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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


//    @Query("select p from Post p where p.user in (select f.toUser from Follow f where f.fromUser = :userId)")
//    List<PostResponse> findPostSubscribe(@Param("userId") Long userId, Pageable pageable);
//
//    @Query("select p from Post p where p.user in (select f.toUser from Follow f where f.fromUser = :userId) order by :criteria desc")
//    List<PostResponse> findPostSubscribeRank(@Param("criteria") String criteria, @Param("userId") Long userId, Pageable pageable);

}
