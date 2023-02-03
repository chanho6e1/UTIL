package com.youtil.server.service.goal;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.goal.GoalPeriodResponse;
import com.youtil.server.dto.goal.GoalResponse;
import com.youtil.server.dto.goal.GoalSaveRequest;
import com.youtil.server.dto.goal.GoalUpdateRequest;
import com.youtil.server.dto.post.PostResponse;
import com.youtil.server.repository.goal.GoalQueryRepository;
import com.youtil.server.repository.goal.GoalRepository;
import com.youtil.server.repository.review.ReviewRepository;
import com.youtil.server.repository.todo.TodoRepository;
import com.youtil.server.repository.user.UserRepository;
import com.youtil.server.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Calendar;

@Service
@RequiredArgsConstructor
public class GoalService {

    @Autowired
    private final GoalRepository goalRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ReviewRepository reviewRepository;
    @Autowired
    private final TodoRepository todoRepository;

    @Autowired
    private final GoalQueryRepository goalQueryRepository;

    public Long createGoal(Long userId, GoalSaveRequest request){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Goal goal = null;

        String[] arr = request.getStartDate().split("T");
//        System.out.println(arr[0]);
        request.setStartDate(arr[0]);
        arr = request.getEndDate().split("T");
        request.setEndDate(arr[0]);

        goal = goalRepository.save(request.of(user));

        return goal.getGoalId();
    }

    public List<GoalResponse> getGoalList(Long userId) {

        return goalQueryRepository.findGoalListByUser(userId).stream().map((goal) -> new GoalResponse(goal)).collect(Collectors.toList());
    }

    public GoalResponse getGoal(Long userId, Long goalId) {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));

        return new GoalResponse(goal);
    }

    @Transactional
    public Long updateGoal(Long userId, Long goalId, GoalUpdateRequest request) {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));

        String[] arr = request.getStartDate().split("T");
//        System.out.println(arr[0]);
        request.setStartDate(arr[0]);
        arr = request.getEndDate().split("T");
        request.setEndDate(arr[0]);

        goal.update(request);
        return goal.getGoalId();
    }

    @Transactional
    public Long deleteGoal(Long userId, Long goalId) {
//        Goal goal = goalRepository.findGoalById(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));
        reviewRepository.deleteByGoalId(goalId);
        todoRepository.deleteByGoalId(goalId);
        goalRepository.deleteById(goalId);
        return goalId;
    }

    public GoalPeriodResponse getGoalPeriod(Long userId) {

        Map<String, String> map = goalRepository.findGoalPeriod(userId);
        String startDate = map.get("startDate");
        String endDate = map.get("endDate");

        return new GoalPeriodResponse(startDate, endDate);

    }

    @Transactional
    public Object toggleGoalState(Long id, Long goalId) {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));

        goal.toggleState();

        return goal.isState();
    }

    public List<PostResponse> getGoalPost(Long userId, Long goalId, int offset, int size) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return goalQueryRepository.findPostListByGoalId(goalId, PageRequest.of(offset-1, size))
                .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }

    public List<GoalResponse> getDoingGoal(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        return goalQueryRepository.getDoingGoal(userId).stream()
                .map((goal) -> new GoalResponse(goal)).collect(Collectors.toList());
    }
}
