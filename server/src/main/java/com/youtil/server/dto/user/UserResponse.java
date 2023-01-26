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


    private String imageUrl;

    private String department;

    private String discription;

    public static UserResponse from(User user) {
        return new UserResponse(user.getUserId(), user.getNickName(), user.getEmail(), user.getUserName(), user.getImageUrl(), user.getDepartment(), user.getDiscription());
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
