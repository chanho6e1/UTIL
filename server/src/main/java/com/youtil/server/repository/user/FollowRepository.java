package com.youtil.server.repository.user;

import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.todo.Todo;
import com.youtil.server.domain.user.Follow;
import com.youtil.server.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    int countByFromUserAndToUser(User fromUser, User toUser); // 팔로우 되어있는지 count하는 메서드

    @Modifying
    @Transactional
    void deleteByToUserAndFromUser(User toUser, User fromUser); // 언팔로우 메서드


    @Query("SELECT f FROM Follow f WHERE f.fromUser = :user")
    List<Follow> getFollowing(@Param("user") User user); // 팔로잉 조회
    @Query("SELECT f FROM Follow f WHERE f.toUser = :user")
    List<Follow> getFollower(User user); // 팔로워 조회
    @Query("SELECT f FROM Follow f WHERE f.fromUser = :fromUser and f.toUser = :toUser")
    Optional<Follow> getUser(@Param("fromUser") User fromUser, @Param("toUser") User toUser); // 테이블에 존재하는지 확인
}
