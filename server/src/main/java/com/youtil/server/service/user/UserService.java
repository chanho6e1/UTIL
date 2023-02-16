package com.youtil.server.service.user;

import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.config.s3.S3Uploader;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.tag.TagResponse;
import com.youtil.server.dto.user.UserResponse;
import com.youtil.server.dto.user.UserUpdateRequest;
import com.youtil.server.repository.tag.UserOfTagRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final UserOfTagRepository userOfTagRepository;
    private final S3Uploader s3Uploader;
    private final String baseImg = "cef3494f-5acf-4d8b-95d7-a9d710722788Pic.jpg";

    public List<TagResponse> getTagLike(Long userId) { // 관심 테그 조회
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return userOfTagRepository.findByUser(user)
                .stream().map(TagResponse::new).collect(Collectors.toList());
    }
    public UserResponse getCurrentUser(Long userId) {
        UserResponse user = UserResponse.from(userRepository.findByUserId(userId), getTagLike(userId));
        return user;
    }
    @Transactional
    public Long updateUser(Long userId, UserUpdateRequest request) throws UnsupportedEncodingException {
        User originUser = userRepository.findByUserId(userId);

        String path = originUser.getImageUrl();


        String newImg = request.getImageUrl();

        if(newImg==null || newImg.equals("")){
            newImg = baseImg;
        }else{
            originUser.setUserProfile(path.replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/",""));
            newImg = newImg.replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/user/", "");
            if(!path.equals(newImg))
                deleteS3Image(path, baseImg);
        }
        request.setImageUrl(newImg);
        originUser.update(request);
        return userId;
    }


    private void deleteS3Image(String path, String baseImg) throws UnsupportedEncodingException {

        if(!path.equals(baseImg)) {
            String source = URLDecoder.decode("static/user/" + path, "UTF-8");
            try {
                s3Uploader.delete(source);
            } catch (AmazonS3Exception e) {
                throw new ResourceNotFoundException("삭제할 파일이 서버에 존재하지 않습니다");
            }
        }
    }

    public boolean checkNickName(String nickName){

        return userRepository.existsByNickName(nickName).isPresent()? true: false;
    }

    public boolean checkEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public UserResponse getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return UserResponse.from(user, getTagLike(user.getUserId()));
    }

    public UserResponse getUserByNickName(String nickName) {
        User user = userRepository.findByNickName(nickName).orElseThrow(() -> new ResourceNotFoundException("User", "nickName", nickName));
        return UserResponse.from(user, getTagLike(user.getUserId()));
    }
}
