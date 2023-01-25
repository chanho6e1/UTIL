package com.youtil.server.service.goal;

import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.goal.GoalSaveRequest;
import com.youtil.server.repository.goal.GoalRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GoalService {

    @Autowired
    GoalRepository goalRepository;
    @Autowired
    UserRepository userRepository;

    public Long createGoal(Long userId, GoalSaveRequest request){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Goal goal = null;

        goal = goalRepository.save(request.of(user));

        return goal.getId();
    }
}
