package com.youtil.server.repository.goal;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.dto.goal.GoalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
//    Goal findGoalById(Long goalId);
    Optional<Goal> findGoalByGoalId(Long goalId);

//    List<Goal> findGoalListByUser(Long userId);
//    List<Goal> findAllByUserId(Long userId);

//    List<Goal> findAllByUserId(Long userId);
//    Goal findByGoalId(Long goalId);
}
