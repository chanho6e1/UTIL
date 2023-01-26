package com.youtil.server.service.goal;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.goal.GoalResponse;
import com.youtil.server.dto.goal.GoalSaveRequest;
import com.youtil.server.dto.goal.GoalUpdateRequest;
import com.youtil.server.repository.goal.GoalQueryRepository;
import com.youtil.server.repository.goal.GoalRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoalService {

    @Autowired
    private final GoalRepository goalRepository;
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final GoalQueryRepository goalQueryRepository;

    public Long createGoal(Long userId, GoalSaveRequest request){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Goal goal = null;

        goal = goalRepository.save(request.of(user));

        return goal.getId();
    }

    public List<GoalResponse> getGoalList(Long userId) {

        return goalQueryRepository.findGoalListByUser(userId).stream().map((goal) -> new GoalResponse(goal)).collect(Collectors.toList());
    }

    public GoalResponse getGoal(Long userId, Long goalId) {
        Goal goal = goalRepository.findGoalById(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));

        return new GoalResponse(goal);
    }

    @Transactional
    public Long updateGoal(Long userId, Long goalId, GoalUpdateRequest request) {
        Goal goal = goalRepository.findGoalById(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));

        goal.update(request);
        return goal.getId();
    }

    @Transactional
    public Long deleteGoal(Long userId, Long goalId) {
//        Goal goal = goalRepository.findGoalById(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));
        goalRepository.deleteById(goalId);
        return goalId;
    }
}
