package com.youtil.server.repository.tag;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.tag.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("SELECT t FROM Tag t WHERE t.tagName = :tagName")
    Tag findByTagName(@Param("tagName")String tagName);


    @Transactional
    @Modifying
    @Query("delete from Tag t where t.tagId = :tagId")
    void deleteByTagId(@Param("tagId") Long tagId);
}
