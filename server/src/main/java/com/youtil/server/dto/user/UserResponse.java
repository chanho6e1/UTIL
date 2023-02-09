package com.youtil.server.dto.user;

import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
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

    public UserResponse(User u) {
        this.userId = u.getUserId();
        this.userName = u.getUserName();
        this.nickname = u.getNickName();
        this.imageUrl = "https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/" + u.getImageUrl();
    }

    public static UserResponse from(User user) {
        String imgUrl = "https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/" + user.getImageUrl();
        return new UserResponse(user.getUserId(), user.getNickName(), user.getEmail(), user.getUserName(), imgUrl, user.getDepartment(), user.getDiscription());
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
