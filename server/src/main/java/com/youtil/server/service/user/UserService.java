package com.youtil.server.service.user;

import com.youtil.server.config.s3.S3Uploader;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.user.UserResponse;
import com.youtil.server.dto.user.UserUpdateRequest;
import com.youtil.server.repository.user.UserRepository;
import com.youtil.server.security.oauth2.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final S3Uploader s3Uploader;

    public UserResponse getCurrentUser(Long userId) {
        UserResponse user = UserResponse.from(userRepository.findByUserId(userId));
        String ImgUrl = "https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/" + user.getImageUrl();
        user.setImageUrl(ImgUrl);
        return user;
    }
    @Transactional
    public Long updateUser(Long userId, UserUpdateRequest request) throws UnsupportedEncodingException {
        User originUser = userRepository.findByUserId(userId);

        String path = originUser.getImageUrl();
//        deleteImg(path);

        logger.info("=============path : {}", path);
//        String baseImg = "3f26016b-a84d-45d8-a688-ed78849e4e6aser.svg";
        String baseImg = "cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg";

        String newImg = null;

        if(request.getImageUrl()==null){
            newImg = baseImg;
//            request.setImageUrl("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/3f26016b-a84d-45d8-a688-ed78849e4e6aser.svg");
//            originUser.setUserProfile(baseImg.replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/",""));
        }else{
            originUser.setUserProfile(path.replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/",""));
            if(!path.equals(baseImg)) { // 카카오톡 기본 이미지 받아오지 않고 이처리 추가해야함(지금은 테스트중이라 주석)
                String source = URLDecoder.decode("static/user/"+path, "UTF-8");
                s3Uploader.delete(source);
            }
            newImg = request.getImageUrl().replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/", "");
        }
        request.setImageUrl(newImg);

        logger.info("=============newImg : {}", request.getImageUrl());

        originUser.update(request);
        logger.info("=============originUserImg : {}", originUser.getImageUrl());
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
