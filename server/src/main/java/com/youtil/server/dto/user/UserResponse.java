package com.youtil.server.dto.user;

import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long userId;

    private String nickname;

    private String email;

    private String userName;


//    private String profileImg;

    private String department;

    public static UserResponse from(User user) {
        return new UserResponse(user.getUserId(), user.getNickName(), user.getEmail(), user.getUserName(), user.getDepartment());
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
