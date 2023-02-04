package com.youtil.server.config.firebase;

import com.youtil.server.domain.user.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NotificationService {


    private final Map<Long, String> tokenMap = new HashMap<>();


    public void register(final Long userId, final String token) {
        tokenMap.put(userId, token);
    }


}
