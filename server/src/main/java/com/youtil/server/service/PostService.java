package com.youtil.server.service;

import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostFile;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostResponse;
import com.youtil.server.dto.post.PostSaveRequest;
import com.youtil.server.dto.post.PostSearch;
import com.youtil.server.dto.post.PostUpdateRequest;
import com.youtil.server.repository.post.*;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    @Autowired
    PostRepository postRepository;
    @Autowired
    PostQueryRepository postQueryRepository;
    @Autowired
    private final PostFileRepository postFileRepository;
    @Autowired
    private final PostFileHandler fileHandler;
    @Autowired
    private final PostLikeRepository postLikeRepository;
    @Autowired
    private final PostCommentRepository postCommentRepository;

    @Autowired
    private final UserRepository userRepository;

    @Transactional
    public PostResponse findPost(Long postId, Long userId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        if (post == null) throw new ResourceNotFoundException("해당 포스트가 존재하지 않는다");

        post.addView();
        Boolean likeStatus = postLikeRepository.existsByPostIdAndUserId(postId, userId);

        return new PostResponse(post, likeStatus);
    }

    @Transactional
    public Long createPost(Long userId, PostSaveRequest request) {
        User user = userRepository.findByUserId(userId);
//                .orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        return postRepository.save(request.of(user)).getId();
//        return postRepository.save(request.of()).getId();
    }

    public List<PostResponse> findPostList(int offset) {
        return postQueryRepository.findPostList(PageRequest.of(offset - 1, 10))
                .stream().map(PostResponse::new).collect(Collectors.toList());
    }

    public List<PostResponse> findPostListByUser(Long userId, int offset) {
        return postQueryRepository.findPostListByUser(userId, PageRequest.of(offset - 1, 10))
                .stream().map(PostResponse::new).collect(Collectors.toList());
    }

    public List<PostResponse> findPostListRank(String criteria, int offset) {
        return postQueryRepository.findPostListRank(criteria, PageRequest.of(offset - 1, 10))
                .stream().map(PostResponse::new).collect(Collectors.toList());
    }

    public List<PostResponse> findByPostContent(String content, int offset) {//내용으로 검색(최근 날짜)
        return postQueryRepository.findByContentContaining(content, PageRequest.of(offset - 1, 10))
                .stream().map(PostResponse::new).collect(Collectors.toList());
    }

    public List<PostResponse> findByPostContentRank(PostSearch search, int offset) {//내용으로 검색, 정렬 기준도 정해줌
        return postQueryRepository.findByContentContainingRank(search, PageRequest.of(offset - 1, 10))
                .stream().map(PostResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public Long deletePost(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));

//        validPostUser(userId, post.getUser().getUserId());

        validPostUser(userId, post.getUser().getUserId());
        postLikeRepository.deleteByPostId(postId);
        postCommentRepository.deleteByPostId(postId);
        postRepository.deleteById(postId);
        return postId;
    }

    public void validPostUser(Long currentUser, Long postUser) {
        if (currentUser == postUser)
            return;
        throw new ResourceForbiddenException("본인이 작성한 글이 아닙니다");
    }

    @Transactional
    public String uploadPostFile(List<MultipartFile> files) throws Exception {
        if (files != null && !files.isEmpty()) {
            return savePostFIle(files);
        }
        return null;
    }

    private String savePostFIle(List<MultipartFile> files) throws Exception {

        List<PostFile> photoList = fileHandler.parseFileInfo(files);
        if (!photoList.isEmpty()) {

            for (int i = 0; i < photoList.size(); i++) {
                PostFile postFile = photoList.get(i);
//                System.out.println(postFile.getSavedFileName());
                postFileRepository.save(postFile);
//                postFile.setPost(post);
//                post.addPostFile(postFileRepository.save(postFile));
            }
        }

        return photoList.get(0).getSavedFileName();

    }

    @Transactional
    public Long updatePost(Long userId, Long postId, PostUpdateRequest request) {

        Post post = postRepository.findById(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));

        validPostUser(userId, post.getUser().getUserId());

        post.update(request.getTitle(), request.getContent());

        return postId;

    }

    @Transactional
    public Boolean togglePostLikes(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));
        PostLike boardLike = PostLike.builder().post(post).userId(userId).build();

        return post.togglePostLike(boardLike);
    }


}


