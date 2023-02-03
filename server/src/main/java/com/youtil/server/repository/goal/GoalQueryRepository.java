package com.youtil.server.repository.goal;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.post.Post;
import com.youtil.server.dto.goal.GoalResponse;
import com.youtil.server.dto.post.PostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

import static com.youtil.server.domain.goal.QGoal.goal;
import static com.youtil.server.domain.post.QPost.post;

@RequiredArgsConstructor
@Repository
public class GoalQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Goal> findGoalListByUser(Long userId){
        return jpaQueryFactory.select(goal).distinct()
                .from(goal)
                .where(goal.user.userId.eq(userId))
                .orderBy(goal.goalId.asc())
                .fetch();
    }

    public List<Post> findPostListByGoalId(Long goalId, PageRequest pageRequest){
        return jpaQueryFactory.select(post).distinct()
                .from(post)
                .where(post.goal.goalId.eq(goalId))
                .orderBy(post.goal.goalId.asc())
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();
    }

    public List<Goal> getDoingGoal(Long userId) { //진행중인 목표만 제공
        return jpaQueryFactory.select(goal).distinct()
                .from(goal)
                .where(goal.user.userId.eq(userId),
                        goal.state.eq(false))
                .orderBy(goal.goalId.asc())
                .fetch();
    }
}
