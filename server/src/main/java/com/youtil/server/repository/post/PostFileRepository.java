package com.youtil.server.repository.post;

import com.youtil.server.domain.post.PostFile;
import com.youtil.server.domain.post.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Repository
public interface PostFileRepository extends JpaRepository<PostFile, Long> {

    @Query("select f from PostFile f where f.path = :path")
    Optional<PostFile> existsByPostFile(@Param("path")String path);

    @Transactional
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("delete from PostFile c where c.post.postId = :postId")
    void deleteByPostId(@Param("postId")Long postId);

    @Query(value = "select f from PostFile f where f.post.postId = :postId limit 1", nativeQuery = true)
    PostFile getByPostId(@Param("postId")Long postId);

}
