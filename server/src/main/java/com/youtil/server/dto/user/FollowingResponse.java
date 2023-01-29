package com.youtil.server.dto.user;

import com.youtil.server.domain.user.Follow;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowingResponse {

    Long toUserId;

    public FollowingResponse(Follow follow) {
        toUserId = follow.getToUser().getUserId();
    }
}
