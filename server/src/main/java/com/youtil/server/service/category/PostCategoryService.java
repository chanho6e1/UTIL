package com.youtil.server.service.category;

import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.category.CategoryResponse;
import com.youtil.server.dto.category.CategorySaveRequest;
import com.youtil.server.dto.category.PostOfCategoryResponse;
import com.youtil.server.repository.category.PostCategoryQueryRepository;
import com.youtil.server.repository.category.PostCategoryRepository;
import com.youtil.server.repository.post.PostRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    PostCategoryQueryRepository postCategoryQueryRepository;

    @Transactional
    public Long createCategory(Long userId, CategorySaveRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return postCategoryRepository.save(request.of(user)).getCategoryId();
    }
    @Transactional
    public Long updateCategory(Long userId, Long catogoryId, CategorySaveRequest request) {
        Category category = postCategoryRepository.findById(catogoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", catogoryId));
        validUser(userId, category.getUser().getUserId());
        category.update(request.getName());
        return category.getCategoryId();
    }

    @Transactional
    public Long deleteCategory(Long userId, Long catogoryId) {
        Category category = postCategoryRepository.findById(catogoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", catogoryId));
        validUser(userId, category.getUser().getUserId());
        category.getPostList().getPostList().stream()
                .forEach(post -> post.resetCategory());
        category.clearUser();
        postCategoryRepository.deleteByCategoryId(catogoryId);
        return catogoryId;
    }
    @Transactional
    public Long setCategory(Long userId, Long catogoryId, Long postId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));
        Category category = postCategoryRepository.findById(catogoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", catogoryId));
        validUser(userId, category.getUser().getUserId());

        post.setCategory(category);
        return catogoryId;
    }
    @Transactional
    public Long resetCategory(Long userId, Long catogoryId, Long postId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));
        Category category = postCategoryRepository.findById(catogoryId).orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", catogoryId));
        validUser(userId, category.getUser().getUserId());
        post.resetCategory();
        return catogoryId;
    }

    public void validUser(Long currentUser, Long catogoryUser) {

        if (currentUser == catogoryUser || currentUser.equals(catogoryUser)) {
            return;
        }
        else {
            throw new ResourceForbiddenException("본인의 카테고리가 아닙니다");
        }
    }

    public List<CategoryResponse> getCategory(Long userId) { //본인의 카테고리 목록
        return postCategoryRepository.getCategory(userId)
                .stream().map(CategoryResponse::new).collect(Collectors.toList());
    }

    public List<PostOfCategoryResponse> getCategoryPosts(Long userId, Long categoryId, String criteria, int offset, int size) {
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        return postCategoryQueryRepository.getCategoryPosts(userId, categoryId, criteria, PageRequest.of(offset-1, size))
                .stream().map((c)-> new PostOfCategoryResponse(c, user)).collect(Collectors.toList());
    }
}
