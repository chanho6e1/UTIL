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
    @Query("SELECT p FROM Post p left join PostLike l on l.post.postId = p.postId  group by p.postId")
    Slice<Post> findList(Pageable pageable);
    @Query("SELECT p FROM Post p left join PostLike l on l.post.postId = p.postId WHERE ((:cop = '<' and  p.postId < :cursor) or (:cop = '>' and  p.postId > :cursor)) group by p.postId")
    Slice<Post> findListByCursor(@Param("cursor")Long cursor, @Param("cop")String cop, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.user.userId = :userId")
    Slice<Post> findMyList(@Param("userId")Long userId, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.user.userId = :userId and ((:cop = '<' and  p.postId < :cursor) or (:cop = '>' and  p.postId > :cursor))")
    Slice<Post> findMyListByCursor(@Param("userId")Long userId, @Param("cursor")Long cursor, @Param("cop")String cop, Pageable pageable);

    @Query("SELECT p FROM Post p left join PostLike l on l.post.postId = p.postId where p.user.userId in (SELECT f.toUser.userId FROM Follow f where f.fromUser.userId = :userId) " +
            "group by p.postId")
    Slice<Post> findByPostSubscribes(@Param("userId")Long userId, Pageable pageable);

    @Query("SELECT p FROM Post p left join PostLike l on l.post.postId = p.postId where p.user.userId in (SELECT f.toUser.userId FROM Follow f where f.fromUser.userId = :userId) " +
            "and ((:cop = '<' and  p.postId < :cursor) or (:cop = '>' and  p.postId > :cursor)) group by p.postId")
    Slice<Post> findByPostSubscribesByCursor(@Param("userId")Long userId, @Param("cursor")Long cursor, @Param("cop")String cop, Pageable pageable);

    @Query("SELECT p FROM Post p left join PostLike l on l.post.postId = p.postId where p.title LIKE CONCAT('%',:content,'%') or p.content LIKE CONCAT('%',:content,'%')"+
            "group by p.postId")
    Slice<Post> findListByContent(@Param("content")String content, Pageable pageable);

    @Query("SELECT p FROM Post p left join PostLike l on l.post.postId = p.postId where p.title LIKE CONCAT('%',:content,'%') or p.content LIKE CONCAT('%',:content,'%')"+
            "and ((:cop = '<' and  p.postId < :cursor) or (:cop = '>' and  p.postId > :cursor)) group by p.postId")
    Slice<Post> findListByContentByCursor(@Param("content")String content, @Param("cursor")Long cursor, @Param("cop")String cop, Pageable pageable);

    @Query("SELECT l FROM PostLike l where l.post.postId = :postId and (:cop = '<' and  l.id < :cursor) or (:cop = '>' and  l.id > :cursor)")
    Slice<PostLike> PostLikesPeopleByCursor(@Param("postId")Long postId, @Param("cursor")Long cursor, @Param("cop")String cop, Pageable pageable);

    @Query("SELECT l FROM PostLike l where l.post.postId = :postId")
    Slice<PostLike> PostLikesPeople(@Param("postId")Long postId, Pageable pageable);




//    @Query("select p from Post p where p.user in (select f.toUser from Follow f where f.fromUser = :userId)")
//    List<PostResponse> findPostSubscribe(@Param("userId") Long userId, Pageable pageable);
//
//    @Query("select p from Post p where p.user in (select f.toUser from Follow f where f.fromUser = :userId) order by :criteria desc")
//    List<PostResponse> findPostSubscribeRank(@Param("criteria") String criteria, @Param("userId") Long userId, Pageable pageable);

}
