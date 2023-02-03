package com.youtil.server.service.user;

import com.youtil.server.common.exception.ArgumentMismatchException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.user.Follow;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.todo.TodoResponse;
import com.youtil.server.dto.user.FollowerResponse;
import com.youtil.server.dto.user.FollowingResponse;
import com.youtil.server.repository.user.FollowRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FollowService {
    @Autowired
    private final FollowRepository followRepository;

    @Autowired
    private final UserRepository userRepository;
    //팔로우
    @Transactional
    public Long follow(Long userId, Long toUserId){
        User toUser = userRepository.findById(toUserId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", toUserId));
        User fromUser = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        if(followRepository.getUser(fromUser, toUser).isPresent()){
            throw new ArgumentMismatchException("이미 팔로우된 유저", toUser.getUserId());
        }

        Follow follow = new Follow();
        follow.setFromUser(fromUser);
        follow.setToUser(toUser);
        Follow savedFollow = followRepository.save(follow);
        return toUserId;
    }
    @Transactional
    public Long deleteByFollowingIdAndFollowerId(Long fromUserId, Long toUserId) { // 언팔로우
        User toUser = userRepository.findById(toUserId).orElseThrow(() -> new ResourceNotFoundException("User", "toUserId", toUserId));
        User fromUser = userRepository.findById(fromUserId).orElseThrow(() -> new ResourceNotFoundException("User", "fromUserId", fromUserId));
        followRepository.deleteByToUserAndFromUser(toUser, fromUser);
        return toUserId;
    }


    public boolean find(Long fromUserId, Long toUserId) { // 팔로우가 되어있는지를 확인하기위해
        User toUser = userRepository.findById(toUserId).orElseThrow(() -> new ResourceNotFoundException("User", "toUserId", toUserId));
        User fromUser = userRepository.findById(fromUserId).orElseThrow(() -> new ResourceNotFoundException("User", "fromUserId", fromUserId));
        if(followRepository.countByFromUserAndToUser(fromUser, toUser) == 0)
            return false; // 팔로우 안되어있음
        return true; // 되어있음
    }


    public List<FollowingResponse> getFollowing(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "fromUserId", userId));
        return followRepository.getFollowing(user).stream().map(FollowingResponse::new).collect(Collectors.toList());
    }

    public List<FollowerResponse> getFollower(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "fromUserId", userId));
        return followRepository.getFollower(user).stream().map(FollowerResponse::new).collect(Collectors.toList());
    }


}
