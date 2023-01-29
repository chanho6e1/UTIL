package com.youtil.server.dto.user;

import com.youtil.server.domain.user.Follow;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowerResponse {

    Long fromUserId;

    public FollowerResponse(Follow follow) {
        fromUserId = follow.getFromUser().getUserId();
    }
}
