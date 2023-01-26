package com.youtil.server.repository.goal;

import com.youtil.server.domain.goal.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
//    List<Goal> findAllByUserId(Long userId);
//    Goal findByGoalId(Long goalId);
}
