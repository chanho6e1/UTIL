package com.youtil.server.repository.goal;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.dto.goal.GoalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youtil.server.domain.goal.QGoal.goal;

@RequiredArgsConstructor
@Repository
public class GoalQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Goal> findGoalListByUser(Long userId){
        return jpaQueryFactory.select(goal)
                .from(goal)
                .where(goal.user.userId.eq(userId))
                .orderBy(goal.startDate.asc())
                .fetch();

    }

}
