package com.youtil.server.repository.post;

import com.youtil.server.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface PostAlarmRespository extends JpaRepository<Post, Long> {

    @Query(value = "select a.user_id userId, a.content replyContent, b.content myContent, date_format(a.modified_date,'%Y-%m-%d') createDate from post_comment a join (select post_id, content from post where user_id = 9) b\n" +
            "on a.post_id = b.post_id order by modified_date desc limit 5;", nativeQuery = true)
    List<Map<String, Object>> findCommentFomMe(@Param("userId") Long userId);


}
