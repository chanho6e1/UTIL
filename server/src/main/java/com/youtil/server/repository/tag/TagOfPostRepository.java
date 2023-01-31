package com.youtil.server.repository.tag;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.tag.Tag;
import com.youtil.server.domain.tag.TagOfPost;
import com.youtil.server.domain.user.User;
import com.youtil.server.domain.user.UserOfTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Repository
public interface TagOfPostRepository extends JpaRepository<TagOfPost, Long> {

    @Query("SELECT t FROM TagOfPost t WHERE t.post = :post")
    List<TagOfPost> findByPost(@Param("post") Post post);

    @Query("SELECT t FROM TagOfPost t WHERE t.tag = :tag")
    List<TagOfPost> findByTag(@Param("tag") Tag tag);

    @Transactional
    @Modifying
    @Query("DELETE FROM TagOfPost t WHERE t.post = :post")
    void deleteByPost(@Param("post") Post post);
}
