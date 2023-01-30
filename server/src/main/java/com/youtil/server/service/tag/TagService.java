package com.youtil.server.service.tag;

import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.tag.Tag;
import com.youtil.server.dto.category.CategoryResponse;
import com.youtil.server.dto.category.CategorySaveRequest;
import com.youtil.server.dto.tag.TagResponse;
import com.youtil.server.dto.tag.TagSaveRequest;
import com.youtil.server.dto.tag.TagUpdateRequest;
import com.youtil.server.repository.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TagService {
    @Autowired
    TagRepository tagRepository;
    @Transactional
    public int findOrCrateTag(TagSaveRequest request) {
        int cnt = 0;    //추가된 테그 수
        for(String tag : request.getSkill()){
            System.out.println("tag : " + tag);
            List<Tag> findTags = tagRepository.findByTagName(tag);

            if(findTags.size() == 0){
                tagRepository.save(request.of(tag));
                cnt++;
            }
        }
        return cnt;
    }
    public List<TagResponse> getTag() {
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
