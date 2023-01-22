package com.youtil.server.service;

import com.youtil.server.common.CursorResult;
import com.youtil.server.common.PagedResponse;
import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.*;
import com.youtil.server.repository.post.PostCommentQueryRepository;
import com.youtil.server.repository.post.PostCommentRepository;
import com.youtil.server.repository.post.PostQueryRepository;
import com.youtil.server.repository.post.PostRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostCommentService {

    @Autowired
    PostCommentRepository postCommentRepository;
    @Autowired
    PostCommentQueryRepository postCommentQueryRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    public PagedResponse<PostCommentResponse> findParentCommentList(Long postId, Sort.Direction sort, String cop, Long cursor, Integer size) {

        Pageable pageable = PageRequest.of(0, size);

        Slice<PostComment> postComments =  postCommentRepository.findCommentListByCursor(postId, cursor, cop, pageable);
        System.out.println(postComments.getContent());
        List<PostCommentResponse> postComment = postComments.stream().map(PostCommentResponse::new).collect(Collectors.toList());
//        System.out.println(postComment.get(0).getContent());

        return new PagedResponse<PostCommentResponse>(postComment, 0, postComments.getSize(),
                0, postComments.isLast());
//        return new CursorResult<>(postComment, postComments.isLast());

    }

    public PagedResponse<PostCommentResponse> findChildCommentList(Long postId, Sort.Direction sort, String cop, Long cursor, Integer size) {

        Pageable pageable = PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdDate"));

        Slice<PostComment> postComments =  postCommentRepository.findCommentListByCursor(postId, cursor, cop, pageable);
        List<PostCommentResponse> postCommentResponse = postComments.stream().map(PostCommentResponse::new).collect(Collectors.toList());

        return new PagedResponse<PostCommentResponse>(postCommentResponse, 0, postComments.getSize(),
                0, postComments.isLast());
    }

//    public List<PostCommentResponse> findCommentList(Long postId, int offset) {
//
//        PostComment postComment = postCommentRepository.findComment(request.getNestedTo())
//                .orElseThrow(() -> new ResourceNotFoundException("PostComment", "commentId", request.getNestedTo()));
//
//        User nestedToInfo =  postComment.getUser();
//
//        List<PostCommentResponse> list =  postCommentQueryRepository.findPostList(postId, PageRequest.of(offset - 1, 10))
//                .stream().().map(PostCommentResponse::new).collect(Collectors.toList());
//
//        post.getPostLikeList().getPostLikeList().parallelStream()
//                .anyMatch(l -> l.ownedBy(post.getUser().getUserId()));
//        return list;
//    }

    @Transactional
    public Long createPostComment(Long userId, Long postId, PostCommentSaveRequest request) {

        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        if(request.getParentId()!=null){
            PostComment postComment = postCommentRepository.findComment(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("PostComment", "commentId", request.getParentId()));
            String nickName = postComment.getUser().getNickName();
            request.setParentWriterNickName(nickName);
        }

        return postCommentRepository.save(request.of(user, post)).getCommentId();
    }

    @Transactional
    public Long updatePostComment(Long userId, Long commentId, PostCommentSaveRequest request) {
        PostComment postComment = postCommentRepository.findComment(commentId).orElseThrow(() -> new ResourceNotFoundException("PostComment", "commentId", commentId));
        validPostUser(userId, postComment.getUser().getUserId());
        postComment.update(request);
        return commentId;

    }

    @Transactional
    public Long deletePostComment(Long userId, Long commentId) {

        PostComment postComment = postCommentRepository.findComment(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("PostComment", "commentId", commentId));
        validPostUser(userId, postComment.getUser().getUserId());
        postCommentRepository.deleteByCommentId(commentId);
        return commentId;
    }

    public void validPostUser(Long currentUser, Long CommnetUser) {

        if (currentUser == CommnetUser || currentUser.equals(CommnetUser)) {
            return;
        } else {
            throw new ResourceForbiddenException("본인이 작성한 글이 아닙니다");
        }
    }
}
