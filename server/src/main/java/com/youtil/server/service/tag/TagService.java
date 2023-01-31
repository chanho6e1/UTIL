package com.youtil.server.service.tag;

import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.tag.Tag;
import com.youtil.server.domain.user.User;
import com.youtil.server.domain.user.UserOfTag;
import com.youtil.server.dto.tag.TagResponse;
import com.youtil.server.dto.tag.TagSaveRequest;
import com.youtil.server.dto.tag.TagUpdateRequest;
import com.youtil.server.repository.tag.TagRepository;
import com.youtil.server.repository.tag.UserOfTagRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TagService {
    @Autowired
    UserOfTagRepository userOfTagRepository;
    @Autowired
    TagRepository tagRepository;
    @Autowired
    UserRepository userRepository;

    // 관심 테그
    @Transactional
    public List<Long> findOrCrateTagLike(Long userId, TagSaveRequest request) { // 관심 테그 추가
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        List<Long> list = new ArrayList<>();
        for(String tag : request.getSkill()){

            Tag findTags = tagRepository.findByTagName(tag);

            if(findTags == null){
                findTags = tagRepository.save(request.of(tag));
            }
            UserOfTag userOfTag = new UserOfTag(user, findTags);
            list.add(userOfTagRepository.save(userOfTag).getUserOfTagId());
        }
        return list;    // UserOfTagId 리스트 리턴
    }
    public List<TagResponse> getTagLike(Long userId) { // 관심 테그 조회
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return userOfTagRepository.findByUser(user)
                .stream().map(TagResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public Long updateTagLike(Long userId, TagSaveRequest request) {
        deleteTagLike(userId);
        findOrCrateTagLike(userId, request);
        return userId;
    }
    @Transactional
    public Long deleteTagLike(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        userOfTagRepository.deleteByUser(user);
        return user.getUserId();
    }


    // 전체 태그
    public List<TagResponse> getTag() { // 전체 테그 조회
        return tagRepository.findAll()
                .stream().map(TagResponse::new).collect(Collectors.toList());
    }
    @Transactional
    public Long deleteTag(Long tagId) {
        Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new ResourceNotFoundException("Tag", "tagId", tagId));
        tagRepository.deleteByTagId(tagId);
        return tagId;
    }

    @Transactional
    public Long updateTag(Long tagId, TagUpdateRequest request) {
        Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new ResourceNotFoundException("Tag", "tagId", tagId));
        tag.update(request.getTagName());
        return tag.getTagId();
    }
}
