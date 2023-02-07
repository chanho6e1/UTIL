package com.youtil.server.service.goal;

import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.config.s3.S3Uploader;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.goal.*;
import com.youtil.server.repository.goal.GoalQueryRepository;
import com.youtil.server.repository.goal.GoalRepository;
import com.youtil.server.repository.review.ReviewRepository;
import com.youtil.server.repository.todo.TodoRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GoalService {

    private final GoalRepository goalRepository;

    private final UserRepository userRepository;

    private final ReviewRepository reviewRepository;

    private final TodoRepository todoRepository;

    private final GoalQueryRepository goalQueryRepository;

    private final S3Uploader s3Uploader;

    private final String baseImg = "f18b354f-b630-4025-98f7-a7ed74f7ba40ogo.png";

    @Transactional
    public Long createGoal(Long userId, GoalSaveRequest request){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Goal goal = null;

        String[] arr = request.getStartDate().split("T");
        request.setStartDate(arr[0]);
        arr = request.getEndDate().split("T");
        request.setEndDate(arr[0]);

        goal = goalRepository.save(request.of(user));

        String path = null;
        if(request.getImageUrl()!=null){
            path = request.getImageUrl().replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/goal/","");
        }

        if(path==null){
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

        String originImg = goal.getImageUrl();

        if(path==null){
            goal.setImageUrl(baseImg);
        }else{
            goal.setImageUrl(path);
            deleteS3Image(originImg, baseImg);
       }
        goal.update(request);
        return goal.getGoalId();
    }

    @Transactional
    public Long deleteGoal(Long userId, Long goalId) throws UnsupportedEncodingException {
        Goal goal = goalRepository.findGoalByGoalId(goalId).orElseThrow(() -> new ResourceNotFoundException("Goal", "goalId", goalId));
        validGoalUser(userId, goal.getUser().getUserId());
        String path = goal.getImageUrl();
        
        deleteS3Image(path, baseImg);
        reviewRepository.deleteByGoalId(goalId);
        todoRepository.deleteByGoalId(goalId);
        goalRepository.deleteById(goalId);
        return goalId;
    }

    private void deleteS3Image(String path, String baseImg) throws UnsupportedEncodingException {

        if(!path.equals(baseImg)) {
            String source = URLDecoder.decode("static/goal/" + path, "UTF-8");
            try {
                s3Uploader.delete(source);
            } catch (AmazonS3Exception e) {
                throw new ResourceNotFoundException("삭제할 파일이 서버에 존재하지 않습니다");
            }
        }
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
