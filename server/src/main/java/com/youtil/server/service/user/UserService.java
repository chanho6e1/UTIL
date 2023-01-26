package com.youtil.server.service.user;

import com.youtil.server.domain.user.User;
import com.youtil.server.dto.user.UserResponse;
import com.youtil.server.dto.user.UserUpdateRequest;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getCurrentUser(Long userId) {
        return userRepository.findByUserId(userId);
    }
    @Transactional
    public User updateUser(Long userId, UserUpdateRequest request){
        User originUser = getCurrentUser(userId);
        originUser.update(request);
        return originUser;
    }

    public boolean checkNickName(String nickName){ return userRepository.existsByNickName(nickName); }

    public boolean checkEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public Object deleteUser(Long id) {
        // 유저 닉네임 "탈퇴한 회원"으로 변환
        return null;
    }

    public UserResponse getUser(Long userId) {
        return UserResponse.from(userRepository.findByUserId(userId));
    }
}
