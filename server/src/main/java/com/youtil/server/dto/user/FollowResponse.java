package com.youtil.server.dto.user;

import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowResponse {

    private String userName;
    private String nickName;
    private String imageUrl;
    public FollowResponse(User user) {

        this.userName = user.getUserName();
        this.nickName = user.getNickName();
        this.imageUrl = user.getImageUrl();
    }
}
