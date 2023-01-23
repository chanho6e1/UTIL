package com.youtil.server.repository.user;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    boolean existsByNickName(String nickName);

    @Query("select u from User u where u.userId = :userId")
    Optional<User> findUser(@Param("userId") Long userId);

    User findByUserId(Long userId);
}
