package com.youtil.server.repository.post;

import com.youtil.server.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository  extends JpaRepository<Post, Long> {


//    @EntityGraph(attributePaths = {"user"})
    @Query("select p from Post p where p.id = :postId")
    Optional<Post> findPost(@Param("postId") Long postId);


}
