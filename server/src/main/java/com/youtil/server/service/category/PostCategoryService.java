package com.youtil.server.service.category;

import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.post.Post;
import com.youtil.server.dto.category.CategorySaveRequest;
import com.youtil.server.repository.category.PostCategoryRepository;
import com.youtil.server.repository.post.PostRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostCategoryService {

    @Autowired
    PostCategoryRepository postCategoryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Transactional
    public Long createCategory(Long id, CategorySaveRequest request) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return postCategoryRepository.save(request.of()).getCategoryId();
    }
    @Transactional
    public Long updateCategory(Long catogoryId, CategorySaveRequest request) {
        Category category = postCategoryRepository.findById(catogoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", catogoryId));
        category.update(request.getName());
        return category.getCategoryId();
    }

    @Transactional
    public Long deleteCategory(Long catogoryId) {
        Category category = postCategoryRepository.findById(catogoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", catogoryId));
        postCategoryRepository.deleteByCategoryId(catogoryId);
        return catogoryId;
    }
    @Transactional
    public Long setCategory(Long catogoryId, Long postId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));
        Category category = postCategoryRepository.findById(catogoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", catogoryId));

        post.setCategory(category);
        return catogoryId;
    }
    @Transactional
    public Long resetCategory(Long catogoryId, Long postId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));
        Category category = postCategoryRepository.findById(catogoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", catogoryId));
        post.resetCategory();
        return catogoryId;
    }
}
