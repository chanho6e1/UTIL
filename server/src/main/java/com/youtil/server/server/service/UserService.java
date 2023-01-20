package com.youtil.server.server.service;

import com.youtil.server.domain.user.User;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(Long userId) {
        return userRepository.findByUserId(userId);
    }
}
