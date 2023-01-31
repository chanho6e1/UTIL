package com.youtil.server.service.user;

import com.youtil.server.config.s3.S3Uploader;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.user.UserResponse;
import com.youtil.server.dto.user.UserUpdateRequest;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final S3Uploader s3Uploader;

    public UserResponse getCurrentUser(Long userId) {
        return UserResponse.from(userRepository.findByUserId(userId));
    }
    @Transactional
    public Long updateUser(Long userId, UserUpdateRequest request) throws UnsupportedEncodingException {
        User originUser = userRepository.findByUserId(userId);

        String path = originUser.getImageUrl();
        deleteImg(path);

        String baseImg = "https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/ab578efc-b859-4285-b32f-b1cba56fa51b122.jpg";

        if(!path.equals(baseImg)) {
            String source = URLDecoder.decode(path.replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/", ""), "UTF-8");
            s3Uploader.delete(source);
        }

        originUser.update(request);
        return userId;
    }

    public void deleteImg(String path){

    }

    public boolean checkNickName(String nickName){ return userRepository.existsByNickName(nickName); }

    public boolean checkEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public Object deleteUser(Long id) {
        // 유저 닉네임 "탈퇴한 회원"으로 변환
        return null;
    }

    public UserResponse getUser(Long userId) {
        return UserResponse.from(userRepository.findByUserId(userId));
    }
}
