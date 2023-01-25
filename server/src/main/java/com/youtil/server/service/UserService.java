package com.youtil.server.service;

import com.youtil.server.domain.user.User;
import com.youtil.server.dto.user.UserUpdateRequest;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(Long userId) {
        return userRepository.findByUserId(userId);
    }
    @Transactional
    public User updateUser(Long userId, UserUpdateRequest request){
        User originUser = getUser(userId);
        originUser.update(request);
        return originUser;
    }

    public boolean checkNickName(String nickName){ return userRepository.existsByNickName(nickName); }

    public boolean checkEmail(String email){
        return userRepository.existsByEmail(email);
    }
}
