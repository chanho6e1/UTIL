package com.youtil.server.service.post;

import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostAlarmCommentResponse;
import com.youtil.server.repository.post.PostAlarmRespository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmService {
    @Autowired
    private final PostAlarmRespository postAlarmRespository;

    @Autowired
    private final UserRepository userRepository;


    public List<PostAlarmCommentResponse> getCommentForMe(Long userId) {
        List<PostAlarmCommentResponse> responses = new ArrayList<>();
        List<Map<String, Object>> list = postAlarmRespository.findCommentFomMe(userId);
        for(Map<String, Object> li : list){
            Long uid = Long.parseLong(li.get("userId").toString());
            User user = userRepository.findById(uid).orElseThrow(() -> new ResourceNotFoundException("User", "userId", uid));
            String replyContent = li.get("replyContent").toString();
            String myContent = li.get("myContent").toString();
            String createDate = li.get("createDate").toString();
            PostAlarmCommentResponse response = new PostAlarmCommentResponse(user.getUserName(), replyContent, myContent, createDate);
            responses.add(response);
        }
        return responses;
    }
}
