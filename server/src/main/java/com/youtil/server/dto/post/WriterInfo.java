package com.youtil.server.dto.post;

import com.youtil.server.domain.user.User;
import com.youtil.server.dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class WriterInfo {
    private Long userId;

    private String nickname;

    private String profileImg;


    public static WriterInfo from(User user) {
        return new WriterInfo(user.getUserId(), user.getNickName(), user.getDepartment());
    }

//    public static WriterInfo from(Long userId) {
//        return new WriterInfo(user.getUserId(), user.getNickName(), user.getDepartment());
//    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
