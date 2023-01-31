package com.youtil.server.repository.tag;

import com.youtil.server.domain.tag.Tag;
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
public interface UserOfTagRepository extends JpaRepository<UserOfTag, Long> {

    @Query("SELECT u FROM UserOfTag u WHERE u.user = :user")
    List<UserOfTag> findByUser(@Param("user") User user);
    @Transactional
    @Modifying
    @Query("DELETE FROM UserOfTag u WHERE u.user = :user")
    void deleteByUser(@Param("user") User user);
}
