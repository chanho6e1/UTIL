package com.youtil.server.dto.user;

import com.youtil.server.domain.user.User;
import com.youtil.server.dto.tag.TagResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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

    private List<TagResponse> tags;

    public UserResponse(Long userId, String nickName, String email, String userName, String imgUrl, String department, String discription) {
        this.userId = userId;
        this.nickname = nickName;
        this.email = email;
        this.userName = userName;
        this.imageUrl = imgUrl;
        this.department = department;
        this.discription = discription;
    }

    public static UserResponse from(User user) {
        String imgUrl = "https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/" + user.getImageUrl();
        return new UserResponse(user.getUserId(), user.getNickName(), user.getEmail(), user.getUserName(), imgUrl, user.getDepartment(), user.getDiscription());
    }
    public static UserResponse from(User user, List<TagResponse> tags) {
        String imgUrl = "https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/" + user.getImageUrl();
        return new UserResponse(user.getUserId(), user.getNickName(), user.getEmail(), user.getUserName(), imgUrl, user.getDepartment(), user.getDiscription(), tags);
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
