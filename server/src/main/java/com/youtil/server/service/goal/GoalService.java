package com.youtil.server.service.goal;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.config.s3.S3Uploader;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.goal.*;
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
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    private final S3Uploader s3Uploader;

    @Transactional
    public Long createGoal(Long userId, GoalSaveRequest request){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Goal goal = null;

        String[] arr = request.getStartDate().split("T");
//        System.out.println(arr[0]);
        request.setStartDate(arr[0]);
        arr = request.getEndDate().split("T");
        request.setEndDate(arr[0]);

        goal = goalRepository.save(request.of(user));

        String path = null;
        if(request.getImageUrl()!=null){
            path = request.getImageUrl().replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/goal/","");
        }

        String baseImg = "f18b354f-b630-4025-98f7-a7ed74f7ba40ogo.png";

        if(path==null){
//            System.out.println(baseImg);
            goal.setImageUrl(baseImg);
        }else{
            goal.setImageUrl(path);
        }
        return goal.getGoalId();
    }

    public List<GoalResponse> getGoalList(Long userId) {

        return goalQueryRepository.findGoalListByUser(userId).stream().map((goal) -> new GoalResponse(goal)).collect(Collectors.toList());
    }

    public GoalResponse getGoal(Long userId, Long goalId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));
        validGoalUser(userId, goal.getUser().getUserId());
//        goalRepository.findGoalByGoalAndUserId(user, goalId).orElseThrow(() -> new ResourceNotFoundException("본인 목표가 아닙니다."));

        return new GoalResponse(goal);
    }

    @Transactional
    public Long updateGoal(Long userId, Long goalId, GoalUpdateRequest request) throws UnsupportedEncodingException {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));
        validGoalUser(userId, goal.getUser().getUserId());
        String[] arr = request.getStartDate().split("T");
        request.setStartDate(arr[0]);
        arr = request.getEndDate().split("T");
        request.setEndDate(arr[0]);
        String path = null;
        if(request.getImageUrl()!=null){
            path = request.getImageUrl().replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/goal/","");
        }

        String baseImg = "f18b354f-b630-4025-98f7-a7ed74f7ba40ogo.png";
        String originImg = goal.getImageUrl();

        if(path==null){
            goal.setImageUrl(baseImg);
        }else{
            goal.setImageUrl(path);
            if(!originImg.equals(baseImg)) {
                String source = URLDecoder.decode("static/goal/"+path, "UTF-8");
                s3Uploader.delete(source);
            }
        }

        goal.update(request);
        return goal.getGoalId();
    }

    @Transactional
    public Long deleteGoal(Long userId, Long goalId) throws UnsupportedEncodingException {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));
        validGoalUser(userId, goal.getUser().getUserId());
        String path = goal.getImageUrl();
        String baseImg = "f18b354f-b630-4025-98f7-a7ed74f7ba40ogo.png";
        if(!path.equals(baseImg)) { // 카카오톡 기본 이미지 받아오지 않고 이처리 추가해야함(지금은 테스트중이라 주석)
            String source = URLDecoder.decode("static/goal/"+path, "UTF-8");
            s3Uploader.delete(source);
        }
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
//        validGoalUser(id, goal.getUser().getUserId());
        goal.toggleState();

        return goal.isState();
    }

//    public List<PostResponse> getGoalPost(Long userId, Long goalId, int offset, int size) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
//        return goalQueryRepository.findPostListByGoalId(goalId, PageRequest.of(offset-1, size))
//                .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
//    }

    public Map<Long, GoalPostResponse> getGoalPost(Long userId, Long goalId, int offset, int size) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        Map<Long, GoalPostResponse> resultMap = new HashMap<>();
        goalQueryRepository.findPostListByGoalId(goalId, PageRequest.of(offset-1, size))
                .stream().map((post)-> resultMap.put(post.getPostId(), new GoalPostResponse(post))).collect(Collectors.toList());
        return resultMap;
    }

//    public List<GoalResponse> getDoingGoal(Long userId) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
//
//        return goalQueryRepository.getDoingGoal(userId).stream()
//                .map((goal) -> new GoalResponse(goal)).collect(Collectors.toList());
//    }

    public Map<Long, GoalResponse> getDoingGoal(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Map<Long, GoalResponse> responseMap = new HashMap<>();
        goalQueryRepository.getDoingGoal(userId).stream()
                .map((goal) -> responseMap.put(goal.getGoalId(), new GoalResponse(goal))).collect(Collectors.toList());

        return responseMap;
    }//

    public void validGoalUser(Long currentUser, Long goalUser) {

        if (currentUser == goalUser || currentUser.equals(goalUser)) {
            return;
        }
        else {
            throw new ResourceForbiddenException("본인이 작성한 글이 아닙니다");
        }
    }
}
